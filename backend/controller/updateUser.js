import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function updateUser(req, res) {
  if (req.params.id == req.userId) {
    await prisma.users
      .update({
        where: {
          id: req.userId,
        },
        data: {
          ...req.body,
        },
      })
      .then((user) => {
        delete user.role;
        delete user.hash;
        delete user.blocked;
        return res.json({
          message: "user updated successfully",
          user,
        });
      })
      .catch((err) => {
        return res.status(403).json({
          message: "there is an error in updating user",
          err,
        });
      });
  } else {
    res.status(403).json({
      message: "You can not Perform this action",
    });
  }
}

export default updateUser;
