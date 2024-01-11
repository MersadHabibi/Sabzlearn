import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Joi from "joi";
const schema = Joi.object({
  id: Joi.string().required().min(1).trim(),
});
function deleteCourse(req, res) {
  schema
    .validateAsync({ id: req.params.id })
    .then((reqId) => {
      prisma.course
        .delete({
          where: {
            id: reqId.id,
          },
        })
        .then((course) => {
          res.json({ message: "Your Course Deleted Successfully." });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "there is an error in deleting course", err });
        });
    })
    .catch((err) => {
      res
        .status(403)
        .json({
          message: "there is an error in your sended Data.",
          err: err?.details[0]?.message,
        });
    });
}

export default deleteCourse;
