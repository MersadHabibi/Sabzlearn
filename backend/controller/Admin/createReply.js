import Joi from "joi";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
function createReply(req, res) {
  const replySchema = Joi.object({
    userId: Joi.string().required().min(1),
    body: Joi.string().required().min(1),
  });

  replySchema
    .validateAsync(req.body)
    .then((reqBody) => {
      if (reqBody.userId !== req.userId)
        return res
          .status(401)
          .json({ message: "You cant add reply from another user" });
      prisma.reply
        .create({
          data: {
            ...reqBody,
            commentId: req.params.id,
          },
        })
        .then((reply) => {
          res.json({ message: "Your Reply Submit Successfully.", reply });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "there is an error in creating reply",
          });
        });
    })
    .catch((err) => {
      return res.status(403).json({
        message: "There is an error in your sended Data.",
        err: err.message,
      });
    });
}

export default createReply;
