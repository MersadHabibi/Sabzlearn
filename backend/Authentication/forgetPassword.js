import { PrismaClient } from "@prisma/client";
import Joi from "joi";

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
            

          } else {
            return res
              .status(403)
              .json({ message: "The user With These Email doesNot Exist.." });
          }
        });
    })
    .catch((err) => {
      return res.status(403).json({
        message: "Your sended Data Is Invalid.",
        err: err?.details[0]?.message,
      });
    });
}

export default forgetPassword;
