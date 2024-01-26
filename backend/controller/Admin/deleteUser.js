import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function deleteUser(req, res) {
  prisma.users
    .delete({
      where: {
        id: req.params.id,
      },
    })
    .then((user) => {
      return res.json({ message: "User deleted successfully." });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
}

export default deleteUser;