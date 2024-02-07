import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getCoursesByCategory(req, res) {
  console.log(req.params.id);
  prisma.course
    .findMany({
      where: {
        categoryId: req.params.id,
      },
      include: {
        Users: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    })
    .then(async (course) => {
      console.log(course);
      if (course != []) {
        const studentsCount = await course?.reduce((count, course) => {
          return count + course?.Users?.length;
        }, 0);

        const obj = {
          categoryId: course.categoryId,
          categoryName: course.category?.name,
          studentsCount,
        };
        if (studentsCount) {
          return res.json({ course, details: obj });
        }
      } else {
        return res.status(404).json({
          message: "There is not any course in this categorie.",
        });
      }
    });
}

export default getCoursesByCategory;
