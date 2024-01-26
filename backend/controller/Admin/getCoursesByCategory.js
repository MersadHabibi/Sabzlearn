import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getCoursesByCategory(req, res) {
  prisma.course
    .findMany({
      where: {
        categoryId: req.params.id,
      },
    })
    .then((coures) => {
      res.json(coures);
    });
}

export default getCoursesByCategory;
