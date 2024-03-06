import checkImage from "../utils/checkImage.js";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const schemaValidator = Joi.object({
  image: Joi.string().required().min(1),
});
async function changeUserProfile(req, res) {
  schemaValidator
    .validateAsync(req.body)
    .then(({ image }) => {
      try {
        const base64Data = image;
        if (checkImage(base64Data)) {
          console.log("Image is valid");
          prisma.users
            .update({
              where: {
                id: req.userId,
              },
              data: {
                imageProfile: req.body.image,
              },
            })
            .then((updatedUser) => {
              return res.json({
                user: updatedUser,
                message: "ImageProfile Updated SuccessFully",
              });
            })
            .catch((err) => {
              console.log("err in updadte Profile to db:", err);
              return res
                .status(403)
                .json({ message: "err in update ProfileImage" });
            });
          // Proceed with storing the image in MongoDB
        }
      } catch (error) {
        console.error("Error:", error.message);
        return res.status(403).json({ message: error.message });
        // Handle error (e.g., return an error response to the client)
      }
    })
    .catch((err) => {
      return res.status(403).json({
        message: "Your Sended Body is Invalid",
        err: err.details[0].message,
      });
    });
}

export default changeUserProfile;
