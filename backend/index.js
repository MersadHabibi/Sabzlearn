import express from "express";
import ApiRouter from "./api/routes.js";

import cors from "cors";
import AdminRoutes from "./routes/adminRoutes.js";
import path from "path";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import serveIndex from "serve-index";
import adminRoutesMiddleWare from "./middlewares/adminRoutesMiddleWare.js";
import { VerifyMailServer } from "./utils/connectMailServer.js";
import redisConnection from "./utils/connectRedis.js";

const options = {
  defenition: {
    openapi: "3.0.0",
    info: {
      title: "Sabzlearn Api",
      version: "1.0.0",
    },
    servers: [
      {
        api: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./index.js"],
};
const app = express();
app.use(express.json());

app.use(cors());

app.set("view engine", "ejs");

app.use("/api/admin", AdminRoutes); //adminRoutesMiddleWare, AdminRoutes);

app.use("/api", ApiRouter);

app.use(
  "/public/images/",
  express.static("public/images", {
    extensions: [".png", ".jpg", ".jpeg"],
  })
);
// Define your routes
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for user management
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - phoneNumber
 *         - address
 *         - password
 *         - repeat_password
 *       properties:
 *         username:
 *           type: string
 *           description: Your Username in our website
 *         email:
 *           type: string
 *           description: Your EmailAddress in our website
 *         phoneNumber:
 *           type: string
 *           description: Your PhoneNumber
 *         address:
 *           type: string
 *           description: Your Address
 *         password:
 *           type: string
 *           description: Your Password
 *         repeat_password:
 *           type: string
 *           description: Repeated Password of the password
 *
 *       example:
 *         username: MohammadFatehi
 *         email: ostoore69@gmail.com
 *         phoneNumber: "09395999832"
 *         address: Tehran
 *         password: somePassword
 *         repeat_password: somePassword
 *
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API for managing courses
 *
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *         - price
 *         - discount
 *         - discountPrice
 *         - time
 *         - teacher
 *         - shortName
 *         - isFree
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the course
 *         description:
 *           type: string
 *           description: The description of the course
 *         category:
 *           type: string
 *           description: The Category Of the course
 *         price:
 *           type: integer
 *           description: The price of the course
 *         discount:
 *           type: integer
 *           description: The discount of the course
 *         discountPrice:
 *           type: integer
 *           description: The discount price of the course
 *         time:
 *           type: string
 *           description: The time of the course
 *         shortName:
 *           type: string
 *           description: the link of the course
 *         teacher:
 *           type: string
 *           description: The course teacher
 *         isFree:
 *           type: boolean
 *           description: Whether the Course is Free.
 *
 *       example:
 *         data: >
 *           {
 *             "title": "Introduction to Programming",
 *             "description": "Learn the basics of programming with this introductory course.",
 *             "category": "Programming",
 *             "price": 29.99,
 *             "discount": 10,
 *             "discountPrice": 19.99,
 *             "time": "2 hours",
 *             "teacher": "John Doe",
 *             "shortName": "intro-programming",
 *             "isFree": false
 *            }
 *
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing Commnets
 *
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - userId
 *         - courseId
 *         - body
 *       properties:
 *         userId:
 *           type: string
 *           description: The userId of who wanted to submit new comment.
 *         courseId:
 *           type: string
 *           description: The courseId of the course which user wanted to submit new comment about that.
 *         body:
 *           type: string
 *           description: The text body of the comment.
 *
 *       example:
 *             userId: 657b5a0b91ba64f7ddf94eb7
 *             courseId: 658088f1895e442070bd1a2e
 *             body: این دوره خوب بود.
 *
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * paths:
 *   /api/register:
 *     post:
 *       summary: Create a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: User registration successful
 *           content:
 *             application/json:
 *               example:
 *                 message: User registered successfully
 *         500:
 *           description: Some server error
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 message: Authentication token is missing or invalid
 *         403:
 *           description: Invalid Request Body
 *           content:
 *             application/json:
 *               example:
 *                 message: error in creating user with this emailAddress or username.
 *   /api/login:
 *     post:
 *       summary: Login user And get Jwt Token.
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLogin'
 *       responses:
 *         200:
 *           description: User registration successful
 *           content:
 *             application/json:
 *               example:
 *                 message: User registered successfully
 *         500:
 *           description: Some server error
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 message: Authentication token is missing or invalid
 *         403:
 *           description: Invalid Request Body
 *           content:
 *             application/json:
 *               example:
 *                 message: error in creating user with this emailAddress or username.
 *
 *   /api/admin/courses:
 *     post:
 *       summary: Create a new course
 *       tags: [Courses]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: JSON data for the course
 *                   default: '{"title":"Default Title","description":"Default Description","category":"Default Category","price":5000,"discount":0,"discountPrice":0,"status":"active","time":"100","teacher":"mohammadFatehi","shortName":"aa","isFree":false}'
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: Image file for the course
 *       responses:
 *         200:
 *           description: Course created successfully
 *           content:
 *             application/json:
 *               example:
 *                 course: object of created Course.
 *         500:
 *           description: Some server error
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 message: Authentication token is missing or invalid
 *
 *   /api/courses:
 *     get:
 *       summary: Get All courses
 *       tags: [Courses]
 *       responses:
 *         200:
 *           description: Course fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 course: array of all the created Course.
 *         500:
 *           description: Some server error
 *
 *   /api/courses/{courseId}:
 *     get:
 *       summary: Get specific course by id.
 *       tags: [Courses]
 *       parameters:
 *         - in: path
 *           name: courseId
 *           required: true
 *           description: ID of the course to retrieve
 *           schema:
 *             type: string
 *           example: "123"
 *       responses:
 *         200:
 *           description: Course fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 course: a course specificed by id.
 *         500:
 *           description: Some server error
 *
 *   /api/comments:
 *     post:
 *       summary: Create a new Commnet.
 *       tags: [Comments]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       responses:
 *         200:
 *           description: Course fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Your Comment Submit Successfully.
 *                 commentId: the Id Of created Comment.
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 message: Authentication token is missing or invalid
 *         500:
 *           description: Some server error
 */

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sabzlearn Api",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./index.js"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(3000, () => {
  VerifyMailServer();
  redisConnection
    .connect()
    .then(() => {
      console.log(`Server is Running on 3000 Port`);
    })
    .catch((err) => {
      console.log(err);
    });
});
