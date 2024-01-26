import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function blockUser(req, res) {
  prisma.users.update({
    where: {
      id: req.params.id,
    },
    data: {
      blocked: true,
    },
  });
}

export default blockUser;
