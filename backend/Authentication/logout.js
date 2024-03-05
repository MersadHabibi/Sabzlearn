import redisCli from "../utils/connectRedis.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function logout(req, res) {
  prisma.users
    .findUnique({
      where: {
        id: req.userId,
      },
      select: {
        email: true,
      },
    })
    .then((user) => {
      if (user) {
        redisCli.get(`${user.email}-isLoggedIn`).then((resultOfRedis) => {
          if (resultOfRedis != null) {
            redisCli.del(`${user.email}-isLoggedIn`).then((resultOfDelete) => {
              if (resultOfDelete == "OK") {
                return res.json({ message: "sucsessFully LoggedOut" });
              } else {
                console.log("err in delete is-LoggedIn: ", resultOfDelete);
              }
            });
          } else {
            return res
              .status(403)
              .json({ message: "You Are Not Login so cant LogOut...." });
          }
        });
      } else {
        return res.status(403).json({ message: "User Is not Exist" });
      }
    })
    .catch((err) => {
      console.log("err in logout findUser: ", err);
    });
}

export default logout;
