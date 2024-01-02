import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Joi from "joi";
import fs from "fs";
const validatSchema = Joi.object({
  title: Joi.string().required().min(1).trim(),
  subjectId: Joi.string().required().min(1).trim(),
  isFree: Joi.boolean().required().only(true, false),
  sortId: Joi.number().required().min(0),
});
function createEpisode(req, res) {
  const file = req.file;
  const reqdata = req.body.data;
  if (!file) {
    return res
      .status(403)
      .json({ message: "You did not send the episode File" });
  }

  let body;
  if (req.body.data) {
    body = JSON.parse(req.body.data);
  } else {
    return res.json({ message: "you did not provide data." });
  }
  //   console.log(req.file.path);
  const reqFilePath = file?.path?.replace(/\\/g, "/");
  console.log(reqFilePath);
  validatSchema
    .validateAsync(body)
    .then((reqBody) => {
      prisma.episode
        .create({
          data: {
            ...reqBody,
            link: reqFilePath,
          },
        })
        .then((subject) => {
          res.json(subject);
        })
        .catch((err) => {
          res.status(500).json({ err });
          fs.rmSync(reqFilePath, { force: true, maxRetries: 5 });
        });
    })
    .catch((err) => {
      return res.status(403).json({
        message: "You sended wrong data.",
        err: err?.details[0]?.message,
      });
    });
}

export default createEpisode;
