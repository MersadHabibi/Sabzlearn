import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Joi from "joi";

const validateSchema = Joi.object({
  name: Joi.string().required().trim().min(1),
});
async function createCategory(req, res) {
  prisma.category.create({ data: { name: req.body.name } }).then((data) => {
    return res.json({ message: "Category created successfully" });
  });
}
export default createCategory;
