import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import BlogRoutes from "./routes/blogsRoutes.js";

// Import models to ensure they're registered
import Blog, { BlogCategory, User } from "./models/projectModels.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api", BlogRoutes);

// MongoDB Connect
mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
