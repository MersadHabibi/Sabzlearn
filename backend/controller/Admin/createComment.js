import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Joi from "joi";

const commentSchema = Joi.object({
  userId: Joi.string().required().min(1),
  courseId: Joi.string().required().min(1),
  body: Joi.string().required().min(1),
});
function createComment(req, res) {
  commentSchema
    .validateAsync(req.body)
    .then((reqBody) => {
      if (reqBody.userId !== req.userId)
        return res
          .status(401)
          .json({ message: "You cant submit comment from another user" });
      prisma.comments
        .create({
          data: reqBody,
        })
        .then((comment) => {
          res.json({ message: "Your Comment Submit Successfully." });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "there is an error in creating comment",
            err: err.message,
          });
        });
    })

    .catch((err) => {
      res
        .status(403)
        .json({ message: "there is an error in your sended data.", err });
    });
}

export default createComment;
