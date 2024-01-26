import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function changeUserRole(req, res) {
    prisma.users
    .update({
        where: {
          id: req.params.id,
        },
        data: {
          role: req.body.role,
        },
      })
    .then((user) => {
        return res.json({ message: "User updated successfully." });
      })
    .catch((err) => {
        return res.status(400).json({ message: err });
      });
}

export default changeUserRole;