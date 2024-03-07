import Joi from "joi";
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
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
        })
        .then((user) => {
          if (user) {
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
