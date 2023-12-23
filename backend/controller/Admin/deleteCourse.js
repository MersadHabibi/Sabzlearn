import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
function deleteCourse(req,res) {
    prisma.course
        .delete({
            where: {
                id: req.params.id
            }
        })
        .then((course) => {
            res.json({ message: "Your Course Deleted Successfully." })
        })
        .catch((err) => {
            res
                .status(500)
                .json({ message: "there is an error in deleting course", err })
        })
}

export default deleteCourse