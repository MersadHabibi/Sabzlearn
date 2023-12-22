import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function getMe(req, res) {
  if (req.userId)
    prisma.users
      .findUnique({
        where: {
          id: req.userId,
        },
      })
      .then((user) => {
        if (user) {
          delete user.hash;
          delete user.role;
          res.json(user);
        }
      });
  else {
    res.status(403).json({ message: "there is an error to get user." });
  }
}
export default getMe;
