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
    })
    .catch((err) => {
      console.log(err, "err");
    });
}

export default buyCourse;
