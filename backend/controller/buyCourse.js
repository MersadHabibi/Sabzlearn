import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function buyCourse(req, res) {
  const { courseId } = req.body;
  console.log(req.userId, "userId");
  prisma.users
    .findFirst({
      where: { id: req.userId },
      include: {
        courses: true,
      },
    })
    .then((user) => {
      console.log(user, "user");
      let userHasCourse = false;;
      if (user.courses != [])  {
        user.courses.map((course) => {
          if (course.id === courseId) {
            userHasCourse = true;
            
          }
        });
      }
    })
    .catch((err) => {
      console.log(err, "err");
    });
}

export default buyCourse;
