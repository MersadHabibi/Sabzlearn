import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import fs from "fs";
import Joi from "joi";
function createCourse(req, res) {
  const courseSchema = Joi.object({
    title: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    category: Joi.string().required().min(1),
    price: Joi.number().required().min(1),
    discount: Joi.number().required(),
    discountPrice: Joi.number().required(),
    status: Joi.string().required().min(1),
    time: Joi.string().required().min(1),
    teacher: Joi.string().required().min(1),
    shortName: Joi.string().required().min(1),
  });

  if (!req.file) return res.json({ message: "you didnot provide image." });
  const body = JSON.parse(req.body.data);
  //   console.log(req.file.path);
  courseSchema
    .validateAsync(body)
    .then((values) => {
      console.log(values);
      let isFree = false;
      if (values.price == 0) isFree = true;
      prisma.course
        .create({
          data: {
            ...values,
            image: req?.file?.path,
            isFree,
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
