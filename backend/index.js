import express from "express";
import ApiRouter from "./api/routes.js";

import cors from "cors";
const app = express();
app.use(express.json());

app.use(cors());

app.use("/api", ApiRouter);
app.use(
  express.static("/public", {
    extensions: [".png"],
  })
);
app.listen(3000, () => {
  console.log(`Server is Running on 3000 Port`);
});
