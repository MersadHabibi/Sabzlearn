import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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
          bcrypt.compare(password, user.hash).then((result) => {
            if (result) {
              delete user.hash;
              delete user.role;
              const token = jwt.sign(user, process.env.SECRET_KEY, {
                expiresIn: "20m",
              });
              return res.json({ token, decodeToken: jwt.decode(token) });
            }
            return res.json({ err: "email or  password is  wrong" });
          });
        });
    })
    .catch((err) => {
      return res.status(403).json({ err });
    });
}

export default login;
