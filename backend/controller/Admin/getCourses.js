import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getCourses(req, res) {
  
    prisma.course.findMany().then((corses) => {
      if (corses) {
        res.json(corses);
      }
    });
}

export default getCourses;
