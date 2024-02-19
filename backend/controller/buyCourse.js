import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Joi from "joi";

const validateSchema = Joi.object({
  courseId: Joi.string().required().min(1).trim(),
});
async function buyCourse(req, res) {
  validateSchema
    .validateAsync(req.body)
    .then(({ courseId }) => {
      console.log(req.userId, "userId");
      prisma.users
        .findFirst({
          where: { id: req.userId },
          include: {
            courses: true,
          },
        })
        .then(async (user) => {
          console.log(user, "user");
          let userHasCourse = false;
          if (user.courses != []) {
            await user.courses.map((course) => {
              if (course.id === courseId) {
                userHasCourse = true;
              }
            });

            if (userHasCourse) {
              return res
                .status(403)
                .json({ message: "You have already have bought this course" });
            } else {
              //   const updatedCourses = [...user.courses, courseId];
              prisma.users
                .update({
                  where: { id: req.userId },
                  data: {
                    courses: {
                      update: {
                        data: {
                          studentsCount: {
                            increment: 1,
                          },
                        },
                      },
                      connect: {
                        id: courseId,
                      },
                    },
                  },
                  include: {
                    courses: true,
                  },
                })
                .then((user) => {
                  console.log(user);
                  return res.json(user);
                });
            }
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    })
    .catch((err) => {
      console.log(err, "err");
      res.status(403).json({ message: err.details[0].message });
    });
}

export default buyCourse;
