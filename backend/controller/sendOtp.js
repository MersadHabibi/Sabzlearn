import mailer from "../utils/connectMailServer.js";
import redisCli from "../utils/connectRedis.js";
import otpGenerator from "otp-generator";
import { verifyEmailDomain } from "email-domain-verifier";

import Joi from "joi";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function sendOtp(
  email,
  firstOne,
  address,
  username,
  password,
  phoneNumber
) {
  return new Promise((resolve, reject) => {
    verifyEmailDomain(email)
      .then((isvalid) => {
        console.log("verifying email: ", isvalid);
        if (isvalid.mxVerificationSucceed && isvalid.smtpVerificationSucceed) {
          prisma.users
            .findFirst({
              where: {
                AND: [{ OR: [{ email }, { username }] }],
              },
            })
            .then((user) => {
              console.log("its log of serch for user", user);
              if (user) {
                return reject({
                  message:
                    "error in creating user with this emailAddress or username.",
                });
              }
              const otpCode = otpGenerator.generate(4, {
                digits: true,
                specialChars: false,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
              });
              Promise.all([
                redisCli.setEx(`otp-${email}`, 80, otpCode),
                firstOne
                  ? redisCli.setEx(
                      `data-${email}`,
                      600,
                      JSON.stringify({
                        address,
                        username,
                        password,
                        phoneNumber,
                      })
                    )
                  : null,
              ]).then((resultOfredis) => {
                console.log("after set varibales to redis");
                if (
                  resultOfredis[0] == "OK" &&
                  (resultOfredis[1] == "OK" || resultOfredis[1] == null)
                ) {
                  mailer
                    .sendMail({
                      from: "mail@sabzlearn.m-fatehi.ir",
                      to: email,
                      subject: "Verification Email",
                      html: `
                  <h1>Your Code is ${otpCode}</h1>
                  `,
                    })
                    .then((result) => {
                      console.log("result of sended Email", result);
                      if (result) {
                        resolve({ message: "email sended successfully" });
                      }
                    })
                    .catch((err) => {
                      console.log("the Error in email sendig", err);
                    });
                } else {
                  console.log(
                    "there is an error in setting varibles to redis",
                    resultOfredis
                  );
                }
              });
            });
        } else {
          console.log("Your Email Address is Invalid", email);
          return reject({ message: "Your Email Address is Invalid" });
        }
      })
      .catch((err) => {
        console.log("err in validating ", err);
        return reject({ err: err.detatils[0].message });
      });
  });
}

function sendOtpController(req, res) {
  console.log("check user in register: ", req.sendOtpInRegister);
  const validationSchema = Joi.object({
    email: Joi.string().email().required().min(1),
    username: Joi.string().required().min(1),
  });
  validationSchema
    .validateAsync(req.body)
    .then((reqBody) => {
      sendOtp(reqBody.email, false, null, reqBody.username, null, null)
        .then((result) => {
          return res.json(result);
        })
        .catch((err) => {
          return res.status(403).json(err);
        });
    })
    .catch((err) => {
      return res.status(403).json({
        message: "Your Data Sended is Invalid",
        err: err.details[0].message,
      });
    });
}

export default sendOtp;

export { sendOtpController };
