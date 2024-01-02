import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Joi from "joi";

const validatSchema = Joi.object({
  title: Joi.string().required().trim().min(1),
  courseId: Joi.string().required().trim().min(1),
  sortId: Joi.number().required(),
});

function createSubject(req, res) {
  validatSchema
    .validateAsync({ ...req.body, ...req.params })
    .then((reqBody) => {
      prisma.subjects
        .create({
          data: {
            ...reqBody,
            episodes: {},
          },
        })
        .then((subject) => {
          res.json(subject);
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    })
    .catch((err) => {
      return res.status(403).json({
        message: "You sended wrong data.",
        err: err?.details[0]?.message,
      });
    });
}

export default createSubject;
