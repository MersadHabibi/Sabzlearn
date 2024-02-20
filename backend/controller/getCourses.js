import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getCourses(req, res) {
  prisma.course
    .findMany({
      select: {
        comments: false,

        category: {
          select: {
            name: true,
          },
        },
        id: true,
        title: true,
        price: true,
        discount: true,
        discountPrice: true,
        isFree: true,
        status: true,
        time: true,
        timeForShow: true,
        studentsCount: true,
        rank: true,
        teacher: true,
        shortName: true,
        image: true,
        menuesId: true,
        categoryId: true,
        usersId: false,
        caption: true,
        subjects: false,
        Menues: true,
        description: false,
      },
    })
    .then((corses) => {
      if (corses) {
        res.json(corses);
      }
    });
}

function getCourseById(req, res) {
  prisma.course
    .findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        subjects: {
          orderBy: {
            sortId: "asc",
          },
          include: {
            episodes: {
              orderBy: {
                sortId: "asc",
              },
            },
          },
        },
        comments: {
          where: { status: "active" },
          include: {
            Users: {
              select: {
                username: true,
                email: true,
                role: true,
              },
            },
            replies: {
              include: {
                Users: {
                  select: {
                    username: true,
                    role: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    })
    .then((course) => {
      return res.json(course);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "there is an error in fetching course by this id." });
    });
}

export default getCourses;
export { getCourseById };
