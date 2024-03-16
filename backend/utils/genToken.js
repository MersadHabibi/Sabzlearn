import jwt from "jsonwebtoken";
import redisCli from "./connectRedis.js";
function genToken(user) {
  return new Promise((resolve, reject) => {
    delete user.hash;
    delete user.role;
    delete user.blocked;
    delete user.imageProfile;
    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "20m",
    });
    if (token) {
      redisCli
        .setEx(`${user.email}-isLoggedIn`, 1200, "true")
        // .set(`${user.email}-isLoggedIn`, "true")
        .then((resultOfRedis) => {
          console.log("result of redis in genToken", resultOfRedis);
          resolve({ user: jwt.decode(token), token, ok: resultOfRedis });
          // resolve({ user: jwt.decode(token), token, ok: true });
        });
    } else {
      reject({ err: " There is an Error in Login" });
    }
  });
}

export default genToken;
