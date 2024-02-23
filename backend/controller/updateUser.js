import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Joi from "joi";
import bcrypt from "bcrypt";
async function updateUser(req, res) {
  console.log(req.body);
  const validation_Schema = Joi.object({
    id: Joi.string().required().min(1),
    name: Joi.string().allow(""),
    family: Joi.string().allow(""),
    address: Joi.string().allow(""),
    current_password: Joi.string().alphanum(),
    new_password: Joi.string().alphanum(),
  });

  validation_Schema
    .validateAsync(req.body)
    .then(async (reqBody) => {
      console.log(reqBody.id, req.userId);
      if (reqBody.id == req.userId) {
        if (req.query.changePassword) {
          prisma.users
            .findUnique({
              where: {
                id: req.userId,
              },
              select: {
                hash: true,
                id: true,
              },
            })
            .then((userData) => {
              if (userData) {
                bcrypt
                  .compare(reqBody.current_password, userData.hash)
                  .then((resultCmp) => {
                    if (!resultCmp)
                      return res.status(403).json({
                        message: "Your current_password is incorrect.",
                      });

                    bcrypt.genSalt(8).then((salt) => {
                      bcrypt.hash(reqBody.new_password, salt).then((hash) => {
                        console.log(hash);
                        prisma.users
                          .update({
                            where: {
                              id: req.userId,
                            },
                            data: {
                              hash,
                            },
                          })
                          .then((user) => {
                            delete user.role;
                            delete user.hash;
                            delete user.blocked;
                            return res.json({
                              message: "user updated successfully",
                              user,
                            });
                          })
                          .catch((err) => {
                            console.log({
                              message: "there is an error in updating user",
                              err,
                            });
                            return res.status(403).json({
                              message: "there is an error in updating user",
                              err,
                            });
                          });
                      });
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    return res
                      .status(403)
                      .json({ message: "Your current_password is incorrect." });
                  });
              } else {
                return res.status(403).json({
                  message: "there is an error in updating user",
                });
              }
            });
        } else {
          delete reqBody.id;
          await prisma.users
            .update({
              where: {
                id: req.userId,
              },
              data: {
                ...reqBody,
              },
            })
            .then((user) => {
              delete user.role;
              delete user.hash;
              delete user.blocked;
              return res.json({
                message: "user updated successfully",
                user,
              });
            })
            .catch((err) => {
              console.log({
                message: "there is an error in updating user",
                err,
              });
              return res.status(403).json({
                message: "there is an error in updating user",
                err,
              });
            });
        }
      } else {
        console.log("You can not Perform this action");
        res.status(403).json({
          message: "You can not Perform this action",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json({
        message: "there is an error in Sended Data.",
        err: err.details[0],
      });
    });
}

export default updateUser;
