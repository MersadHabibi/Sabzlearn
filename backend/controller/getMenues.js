import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
function getMenues(req, res) {
  prisma.category
    .findMany({
      select: {
        id: true,
        name: true,
        Course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })
    .then((menuse) => {
      console.log(menuse);
      res.json(menuse);
    })
    .catch((err) => {
      console.log("err in finding menues", err);
      res.status(500).json({ message: err });
    });
}

export default getMenues;
