import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import Jwt from "jsonwebtoken";
const prisma = new PrismaClient();

import mailer from "../utils/connectMailServer.js";

function forgetPassword(req, res) {
  const validateSchema = Joi.object({
    email: Joi.string().email().required().min(1),
  });

  validateSchema
    .validateAsync(req.body)
    .then(({ email }) => {
      prisma.users
        .findUnique({
          where: {
            email,
          },
        })
        .then((user) => {
          if (user) {
            const secret = process.env.SECRET_KEY + "-" + user.hash;
            const token = Jwt.sign(
              {
                email: user.email,
              },
              secret,
              {
                expiresIn: "20m",
              }
            );

            const link = `http://localhost:3000/api/reset-password/${user.id}/${token}`;
            mailer
              .sendMail({
                from: "mail@sabzlearn.m-fatehi.ir",
                to: user.email,

                subject: "Reset Password Link",
                html: `
                  <h1>Your Link is:</h1>
                  <br/>
                  <a href=${link} target="_blank">Click Here</a>
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
                return res
                  .status(500)
                  .json({ message: "server Error in sendig link" });
              });
          } else {
            return res
              .status(403)
              .json({ message: "The user With These Email doesNot Exist.." });
          }
        });
    })
    .catch((err) => {
      console.log("err in validating forgetpassword", err);
      return res.status(403).json({
        message: "Your sended Data Is Invalid.",
        err: err?.details[0]?.message,
      });
    });
}

export default forgetPassword;
