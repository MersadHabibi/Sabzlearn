import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from "bcrypt";
import dotenv from "dotenv";

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
                },
              })
              .then((user) => {
                console.log(user);
                delete user.hash;
                delete user.role;
                res.json(user);
              })
              .catch((err) => {
                if (err.code == "P2002") {
                  res.status(403).json({
                    message: `error in creating user with this emailAddress.`,
                  });
                } else {
                  console.log(err);
                }
              });
          });
        })
        .catch((err) => {
          console.log("err in creating hash", err);
          return res.status(403).json(err);
        });
    })
    .catch((err) => {
      console.log("err in validating ", err);
      return res.status(403).json(err);
    });
}

export default register;
