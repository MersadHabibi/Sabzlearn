import passport from "passport";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Strategy } from "passport-google-oauth20";
import redisCli from "../utils/connectRedis.js";

const GoogleStrategy = Strategy;
passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.CALLBACK_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const profilePhoto = profile.photos[0].value;

      prisma.users
        .findUnique({
          where: {
            email,
          },
        })
        .then((currentUser) => {
          console.log("currentUser", currentUser);
          if (!currentUser) {
            prisma.users
              .create({
                data: {
                  email,
                  name: firstName,
                  family: lastName,
                  imageProfile: profilePhoto,
                  hash: "",
                  username: email,
                  phoneNumber: "",
                  address: "",
                  comments: {},
                  replies: {},
                },
              })
              .then((newUser) => {
                delete newUser.blocked;
                delete newUser.role;
                delete newUser.hash;

                return done(null, newUser, { status: 201 }, 201);
              });
          } else {
            console.log("in elseBLock");
            redisCli
              .get(`${email}-isLoggedIn`)
              .then((resultOfRedis) => {
                if (resultOfRedis != null) {
                  console.log("resultOfRedis,", resultOfRedis);
                  return done(
                    null,
                    false,
                    {
                      message: `You have previously signed up with a different signin method`,
                      ok: false,
                      status: 400,
                    },
                    400
                  );
                } else {
                  console.log("User not Log in");
                  return done(null, currentUser, { status: 200 }, 200);
                }
              })
              .catch((err) => {
                console.log("err in get emailIsLoggedIn", err);
              });
          }
        });
    }
  )
);
