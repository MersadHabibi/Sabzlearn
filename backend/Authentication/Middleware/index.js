import { config } from "dotenv";
import jwt from "jsonwebtoken";

function AuthCheckMiddleWare(req, res, next) {
  console.log(req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization != undefined) {
    const authHeader = req.headers.authorization;
    const splited_value = authHeader.split(" ");
    if (splited_value[0] == "Bearer") {
      if (splited_value[1] && splited_value[1] != null) {
        const token = splited_value[1];
        try {
          const token_verifyed = jwt.verify(token, process.env.SECRET_KEY);
          if (token_verifyed) {
            console.log(token_verifyed);
            req.userId = token_verifyed.id;
            next();
          }
        } catch (err) {
          return res
            .status(401)
            .json({ message: "Authentication Token Is Invalid." });
        }
      }
    }
  } else {
    res.status(401).json({
      message: "Authentication token doesnot provided.",
    });
  }
  //   next();
}

export default AuthCheckMiddleWare;
