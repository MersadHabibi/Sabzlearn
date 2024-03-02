import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisCli from "../utils/connectRedis.js";
import genToken from "../utils/genToken.js";
dotenv.config();
function login(req, res) {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
  });
  loginSchema
    .validateAsync(req.body)
    .then(({ email, password }) => {
      prisma.users
        .findUnique({
          where: {
            email,
          },
        })
        .then((user) => {
          if (!user)
            return res.status(403).json({ err: "email or password is wrong." });
          else if (user.blocked)
            return res.status(403).json({ err: "your account is blocked." });

          redisCli.get(`${email}-isLoggedIn`).then((resultOfRedis) => {
            if (resultOfRedis != null) {
              return res
                .status(403)
                .json({ err: "you are already logged in." });
            } else {
              bcrypt.compare(password, user.hash).then((result) => {
                if (result) {
                  redisCli
                    .setEx(`${user.email}-isLoggedIn`, 1200, "true")
                    .then((userLoggedIn) => {
                      console.log(userLoggedIn);
                      genToken(user)
                        .then((result, resultOfRedis) => {
                          if (resultOfRedis) {
                            return res.json(result);
                          } else {
                            return res
                              .status(500)
                              .json({ message: "Server Error" });
                          }
                        })
                        .catch((err) => {
                          return res.status(403).json(err);
                        });
                    })
                    .catch((err) => {
                      console.log("err in set IsLoggedIn", err);
                      return res.status(500).json({ err: "server Error" });
                    });
                }
                return res.json({ err: "email or  password is  wrong" });
              });
            }
          });
        });
    })
    .catch((err) => {
      return res.status(403).json({ err });
    });
}

export default login;
