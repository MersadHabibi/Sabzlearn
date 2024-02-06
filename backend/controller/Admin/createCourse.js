import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import fs from "fs";
import Joi from "joi";
function createCourse(req, res) {
  const courseSchema = Joi.object({
    title: Joi.string().required().min(1).trim(),
    description: Joi.string().trim(),
    price: Joi.number().required().min(1),
    discount: Joi.number().required(),
    discountPrice: Joi.number().required(),
    status: Joi.string().required().min(1).trim(),
    time: Joi.number().required(),
    teacher: Joi.string().required().min(1).trim(),
    shortName: Joi.string().required().min(1).trim(),
    isFree: Joi.boolean().only(true, false).required(),
    caption: Joi.string().trim().required().min(1),
    categoryId: Joi.string().trim(),
  });

  if (!req.file) return res.json({ message: "you didnot provide image." });

  let body;
  if (req.body.data) {
    body = JSON.parse(req.body.data);
  } else {
    return res.json({ message: "you did not provide data." });
  }
  //   console.log(req.file.path);
  const reqFilePath = req?.file?.path?.replace(/\\/g, "/");
  console.log(reqFilePath);
  courseSchema
    .validateAsync(body)
    .then((values) => {
      console.log(values);
      prisma.course
        .create({
          data: {
            ...values,
            image: reqFilePath,
          },
        })
        .then((course) => {
          res.json(course);
        });
    })
    .catch((err) => {
      fs.rm(req?.file?.path, (err) => {
        console.log(err);
      });
      if (err.details) res.json({ message: err?.details[0]?.message });
      else {
        console.log(err);
        res.json({ message: "error in creating course" });
      }
    });
}
export default createCourse;
