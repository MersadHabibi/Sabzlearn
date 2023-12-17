import express from "express";
import ApiRouter from "./api/routes.js";

import cors from "cors";
import AdminRoutes from "./routes/adminRoutes.js";
import path from "path";

import serveIndex from "serve-index";
const app = express();
app.use(express.json());

app.use(cors());

app.use("/api", ApiRouter);
// app.use(
//   express.static(path.join("public/", "images/"), {
//     extensions: [".png", ".jpg"],
//   })
// );

app.use("/public/images/", express.static("public/images"));

app.use("/api/admin", AdminRoutes);

app.listen(3000, () => {
  console.log(`Server is Running on 3000 Port`);
});
