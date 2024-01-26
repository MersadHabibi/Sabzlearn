import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Joi from "joi";
import fs from "fs";
import Ffmpeg from "fluent-ffmpeg";
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
      Ffmpeg.ffprobe(reqFilePath, (err, metadata) => {
        console.log(metadata);
        const minute = Math.floor(metadata.format.duration / 60);
        const second = Math.floor(metadata.format.duration % 60);
        console.log(minute, second);
        prisma.episode
          .create({
            data: {
              ...reqBody,
              time: `${minute}:${second}`,
              link: reqFilePath,
            },
          })
          .then((episode) => {
            return res.status(200).json({
              message: "Episode created successfully",
              episode,
            });
          })
          .catch((err) => {
            fs.rmSync(reqFilePath, { force: true, maxRetries: 5 });
            console.log(err);
            return res.status(500).json({ err });
          });
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
