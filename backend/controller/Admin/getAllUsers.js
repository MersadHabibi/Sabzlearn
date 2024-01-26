import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllUsers(req, res) {
  prisma.users.findMany().then((users) => {
    return res.json(users);
  });
}

export default getAllUsers;
