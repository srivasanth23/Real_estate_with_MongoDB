import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes.js";
import { residencyRoutes } from "./routes/residencyRoutes.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const DatabaseUrl = process.env.DATABASE_URL;

//one time setup
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json()); // Optional if using Express 4.x or below

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });

app.use("/api/user", userRoutes);
app.use("/api/residency", residencyRoutes);

mongoose
  .connect(DatabaseUrl)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`); //To check server is running
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });
