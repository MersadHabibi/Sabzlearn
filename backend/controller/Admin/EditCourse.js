import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Joi from "joi";
const EditCourseSchema = Joi.object({
  title: Joi.string().min(1),
  description: Joi.string().min(1),
  categoryId: Joi.string().min(1),
  price: Joi.number().min(1),
  discount: Joi.number(),
  discountPrice: Joi.number(),
  status: Joi.string().min(1),
  time: Joi.string().min(1),
  teacher: Joi.string().min(1),
  shortName: Joi.string().min(1),
  isFree: Joi.boolean().only(true, false),
  caption: Joi.string().trim(),
});
function EditCourse(req, res) {
  EditCourseSchema.validateAsync(req.body)
    .then((reqBody) => {
      prisma.course
        .update({
          data: {
            ...reqBody,
          },

          where: {
            id: req.params.id,
          },
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "there is an error in Updating Course.", err });
        });
    })
    .catch((err) => {
      return res
        .status(403)
        .json({
          message: "there is an error in your sended Data.",
          err: err?.details[0]?.message,
        });
    });
}

export default EditCourse;
