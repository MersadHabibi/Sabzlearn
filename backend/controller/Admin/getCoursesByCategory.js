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
        category: {
          select: {
            name: true,
          },
        },
      },
    })
    .then(async (courses) => {
      console.log(courses);
      if (courses != []) {
        // const studentsCount = courses?.reduce((count, course) => {
        //   console.log(count);
        //   console.log(Array.from(course?.Users));
        //   return count + Array.from(course?.Users).length;
        // }, 0);
        // prisma.users.findMany({
        //   include:{

        //   },
        //   where:{

        //   }
        // })
        const obj = {
          categoryId: courses[0].categoryId,
          categoryName: courses[0].category?.name,
          studentsCount: 0,
        };
        // console.log(studentsCount);
        // if (studentsCount) {
        return res.json({ courses, details: obj });
        // }
      } else {
        return res.status(404).json({
          message: "There is not any course in this categorie.",
        });
      }
    });
}

export default getCoursesByCategory;
