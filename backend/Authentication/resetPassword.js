import Joi from "joi";
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import createHash from "../utils/createHash.js";

const prisma = new PrismaClient();

const validateSchema = Joi.object({
  userId: Joi.string().required().min(1).trim(),
  token: Joi.string().required().min(1).trim(),
});
function resetPassword(req, res) {
  validateSchema
    .validateAsync(req.params)
    .then(({ userId, token }) => {
      prisma.users
        .findUnique({
          where: {
            id: userId,
          },
          select: {
            hash: true,
            id: true,
          },
        })
        .then((user) => {
          if (user) {
            const secret = process.env.SECRET_KEY + "-" + user.hash;
            try {
              console.log("here is token ", token);
              const verifyed = Jwt.verify(token, secret);
              if (verifyed) {
                createHash(req.body.password).then((hash) => {
                  prisma.users
                    .update({
                      where: {
                        id: user.id,
                      },
                      data: {
                        hash,
                      },
                    })
                    .then((updatedUser) => {
                      res.json(updatedUser);
                    })
                    .catch((err) => {
                      console.log(err);
                      res
                        .status(403)
                        .json({ message: "Your Body is invalid." });
                    });
                });
              }
            } catch (err) {
              console.log(err);
              if (err instanceof Jwt.TokenExpiredError) {
                return res.status(403).json({
                  message: "Your Reset Password Link was Expired.",
                  status: 403,
                });
              } else if (err instanceof Jwt.JsonWebTokenError) {
                return res.status(403).json({
                  message: "Your Reset Password Link was Used Before.",
                  status: 401,
                });
              }
            }
          } else {
            return res.status(403).json("Your Url Is Invalid");
          }
        })
        .catch((err) => {
          if (err.code == "P2023") {
            res.status(403).json({ message: "Your Url is Invalid" });
          }
        });
    })
    .catch((err) => {
      return res.status(403).json("Your Url Is Invalid");
    });
}

export default resetPassword;
