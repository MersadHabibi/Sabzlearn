import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
function getComments(req,res) {
prisma.comments.findMany({}).then(comments=>{
    return res.json({message:"Fetch comments successfully"})
})
}

export default getComments