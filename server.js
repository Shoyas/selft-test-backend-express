import express from "express";
import dotenv from "dotenv";
import dbConfig from "./config/dbConfig.js";
import userRouter from "./routes/usersRoute.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
const port = process.env.PORT || 5000;

dbConfig.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`);
  });
});
