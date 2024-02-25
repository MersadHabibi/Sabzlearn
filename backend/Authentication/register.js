import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mailer from "../utils/connectMailServer.js";
import redisCli from "../utils/connectRedis.js";
import otpGenerator from "otp-generator";
import emailValidator from "node-email-verifier";

dotenv.config();

import Joi from "joi";
function register(req, res) {
  const registerSchema = Joi.object({
    username: Joi.string().required().min(1),
    email: Joi.string().email().required().min(1),
    phoneNumber: Joi.string().required().min(1),
    address: Joi.string().required().min(1),
    password: Joi.string().alphanum().required().min(1),
    repeat_password: Joi.ref("password"),
  }).with("password", "repeat_password");

  prisma.$connect();
  registerSchema
    .validateAsync(req.body)
    .then(({ email, password, username, address, phoneNumber }) => {
      emailValidator(email)
        .then((isvalid) => {
          if (isvalid) {
            const otpCode = otpGenerator.generate(4, {
              digits: true,
              specialChars: false,
              lowerCaseAlphabets: false,
              upperCaseAlphabets: false,
            });
            Promise.all([
              redisCli.setEx(`otp-${email}`, 60, otpCode),
              redisCli.setEx(`data-${email}`, 600, {
                address,
                username,
                password,
                phoneNumber,
              }),
            ]).then((resultOfredis) => {
              if (resultOfredis == "OK") {
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
                      res.json({ message: "email sended successfully" });
                    }
                  })
                  .catch((err) => {
                    console.log("the Error in email sendig", err);
                  });
              }
            });
          } else {
            console.log("Your Email Address is Invalid", email);
            return res
              .status(403)
              .json({ message: "Your Email Address is Invalid" });
          }
        })
        .catch((err) => {
          console.log("err in validating ", err);
          return res.status(403).json(err);
        });
    })
    .catch((err) => {
      console.log("err in validating ", err);
      return res.status(403).json(err);
    });
}

async function verifyOtp(req, res) {
  const otpSchema = Joi.object({
    code: Joi.string().required().min(4),
    email: Joi.string().email().required().min(1),
  });

  otpSchema
    .validateAsync(req.body)
    .then((reqBody) => {
      redisCli
        .get(`otp-${reqBody.email}`)
        .then((data) => {
          if (data == null) {
            console.log("The key isnot exit");
            return res
              .status(403)
              .json({ message: "Your otp Code time was up. try Again" });
          }
          if (data === reqBody.code) {
            redisCli.get(`data-${reqBody.email}`).then((userData) => {
              if (userData == null) {
                return res
                  .status(403)
                  .json({ message: "You have to Do register Proccess Again." });
              }
              createuser({ ...userData }).then((result) => {
                return res.status(200).json(result);
              });
            });
          } else {
            return res.status(403).json({ message: "Your Otp Code Is wrong." });
          }
        })
        .catch((err) => {
          console.log("err in fetching otp by this email", err);
        });
    })
    .catch((err) => {
      console.log("err in verify otp", err);
      return res.status(403).json({
        message: "your seended Data is Invalid.",
        err: err?.details[0]?.message,
      });
    });
}

function createuser({ email, password, username, address, phoneNumber }) {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(8)
      .then((salt) => {
        bcrypt.hash(password, salt).then((hash) => {
          console.log(hash);
          prisma.users
            .create({
              data: {
                email,
                username,
                address,
                phoneNumber,
                hash,
                comments: {},
                replies: {},
              },
            })
            .then((user) => {
              console.log(user);
              delete user.hash;
              delete user.role;
              const token = jwt.sign(user, process.env.SECRET_KEY);
              return resolve({ user, token });
            })
            .catch((err) => {
              if (err.code == "P2002") {
                return reject({
                  message: `error in creating user with this emailAddress or username.`,
                });
              } else {
                console.log(err);
              }
            });
        });
      })
      .catch((err) => {
        // console.log(");
        return reject({ message: `err in creating hash, ${err}` });
      });
  });
}

export { verifyOtp };
export default register;
