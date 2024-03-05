import genToken from "../utils/genToken.js";
import passport from "passport";
import "../config/google.js";
function googleAuth(req, res, next) {
  passport.authenticate(
    "google",
    { session: false },
    function (err, user, info, stt) {
      const status = info?.status;
      console.log("status:", status, "info: ", info);
      if (status == 400) {
        console.log("status is 400");
        return res
          .writeHead(301, {
            Location: `http://localhost:8000/google-auth/error.html?status=${status}`,
          })
          .end();
      } else if (status == 200 || status == 201) {
        console.log(`in Status ${status} in routes File`);
        genToken(user)
          .then((result) => {
            console.log("resultOfRedis in setEx in googleAuth", result.ok);
            if (result.ok) {
              return res
                .writeHead(301, {
                  Location: `http://localhost:8000/google-auth/success.html?token=${result.token}`,
                })
                .end();
            } else {
              console.log("result is not true", result.ok);
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(403).json(err);
          });
      }
    }
  )(req, res, next);
}

export default googleAuth;
