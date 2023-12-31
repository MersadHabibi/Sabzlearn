import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import Joi from "joi";
const updateCommentStatusValidation = Joi.object({
  commentId: Joi.string().required().min(1),
  status: Joi.string().required().valid("active", "disActive", "pending"),
});
function updateCommentStatus(req, res) {
  updateCommentStatusValidation
    .validateAsync({ ...req.body, ...req.params })
    .then((reqBody) => {
      prisma.comments.update({
        where: {
          id: reqBody.commentId,
        },
        data: {
          status: reqBody.status,
        },
      }).then()
    })
    .catch((err) => {
      console.log(err);
      return res.status(403).json({
        message: "You sended wrong data.",
        err: err?.details[0]?.message,
      });
    });
}

export default updateCommentStatus;
