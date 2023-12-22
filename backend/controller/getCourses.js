import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getCourses(req, res) {
  prisma.course.findMany().then((corses) => {
    if (corses) {
      res.json(corses);
    }
  });
}

function getCoursesById(req, res) {
  prisma.course
    .findUnique({
      where: {
        id: req.params.id,
      },
    })
    .then((course) => {
      res.json(course);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "there is an error in fetching course by this id." });
    });
}

export default getCourses;
export {
  getCoursesById
}
