import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
function deleteComment(req, res) {
  prisma.comments
    .delete({
      where: {
        id: req.params.id,
      },
    })
    .then((comment) => {
      res.json({ message: "Your Comment Deleted Successfully." });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "there is an error in deleting comment", err });
    });
}

export default deleteComment;
