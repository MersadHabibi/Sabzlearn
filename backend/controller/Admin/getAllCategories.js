import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCountOfUsersInEachCourseCategory() {
  const categoryStudentCount = await prisma.category.findMany({
    include: {
      Course: {
        include: {
          Users: true,
        },
      },
    },
  });

  const formattedCounts = categoryStudentCount?.map((category) => {
    console.log(category);
    const studentsCount = category?.course?.reduce((count, course) => {
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
  prisma.category.findMany().then(async (categories) => {
    const count = await getCountOfUsersInEachCourseCategory();
    await res.json(count);
  });
}
export default getAllCategories;
