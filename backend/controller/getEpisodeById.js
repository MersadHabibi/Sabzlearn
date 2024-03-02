import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Joi from "joi";
function getEpisodeById(req, res) {
  const validationSchema = Joi.object({
    id: Joi.string().required().min(1),
  });
  validationSchema
    .validateAsync(req.params)
    .then(({ id }) => {
      prisma.episode
        .findUnique({
          where: {
            id,
          },
          include: {
            Subjects: {
              select: {
                Course: {
                  include: {
                    category: {
                      select: {
                        name: true,
                      },
                    },
                    subjects: true,
                  },
                },
                episodes: true,
              },
            },
          },
        })
        .then((episode) => {
          return res.json({ message: "success", episode });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(403).json({
        message: "Your sended Data Is Invalid",
        err: err?.details[0]?.message,
      });
    });
}

export default getEpisodeById;
