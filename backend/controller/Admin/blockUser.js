import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function blockUser(req, res) {
  prisma.users
    .findUnique({
      where: {
        id: req.params.id,
      },
    })
    .then((user) => {
      prisma.users
        .update({
          where: {
            id: req.params.id,
          },
          data: {
            blocked: !user.blocked,
          },
        })
        .then((result) => {
          res.json({
            message: `User ${
              user.blocked ? "UnBlocked" : "Blocked"
            } Successfully`,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "there is an error in block user",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "there is an error in block user",
          });
        });
    });
}

export default blockUser;
