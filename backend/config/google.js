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
            prisma.users.create({
              email,
              firstName,
              lastName,
              data: {
                email,
                firstName,
                lastName,
                imageProfile: profilePhoto,
                hash: "",
              },
            });

            return done(null, newUser, null, 201);
          } else {
            redisCli.get(`${email}-isLoggedIn`).then((resultOfRedis) => {
              if (resultOfRedis != null) {
                console.log("resultOfRedis,", resultOfRedis);
                return done(
                  null,
                  false,
                  {
                    message: `You have previously signed up with a different signin method`,
                  },
                  400
                );
              } else {
                return done(null, currentUser, null, 200);
              }
            });
          }
        });
    }
  )
);
