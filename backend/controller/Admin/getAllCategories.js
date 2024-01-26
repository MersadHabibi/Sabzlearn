import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCountOfUsersInEachCourseCategory() {
  const categoryStudentCount = prisma.category.findMany({
    include: {
      Course: {
        include: {
          Users: true,
        },
      },
    },
  });

  const formattedCounts = categoryStudentCount.map((category) => {
    const studentsCount = category.courses.reduce((count, course) => {
      return count + course.users.length;
    }, 0);

    return {
      categoryId: category.id,
      categoryName: category.name,
      studentsCount,
    };
  });
  return formattedCounts;
}

async function getAllCategories(req, res) {
  prisma.category.findMany().then((categories) => {
    res.json(categories);
  });
}
export default getAllCategories;
