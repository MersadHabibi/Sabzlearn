import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import dotenv from "dotenv";
import redisCli from "../utils/connectRedis.js";
import sendOtp from "../controller/sendOtp.js";

dotenv.config();

import Joi from "joi";
import genToken from "../utils/genToken.js";
import createHash from "../utils/createHash.js";
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
      sendOtp(email, true, address, username, password, phoneNumber)
        .then((result) => {
          req.sendOtpInRegister = true;
          return res.json(result);
        })
        .catch((err) => {
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
          console.log(data);
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
              createuser({
                ...JSON.parse(userData),
                email: reqBody.email,
              })
                .then((result) => {
                  return res.status(200).json(result);
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(403).json(err);
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
    createHash(password)
      .then((hash) => {
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
            genToken(user)
              .then((result, resultOfRedis) => {
                if (resultOfRedis) {
                  return resolve(result);
                }
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            if (err.code == "P2002") {
              console.log(err);
              return reject({
                message: `error in creating user with this emailAddress or username.`,
              });
            } else {
              console.log(err);
            }
          });
      })
      .catch((err) => {
        return reject({ message: `err in creating hash, ${err}` });
      });
  }).catch((err) => {
    // console.log(");
    return reject({ message: `err in creating hash, ${err}` });
  });
}

export { verifyOtp };
export default register;
