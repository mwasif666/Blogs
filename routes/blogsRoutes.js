// Example: blogsRoutes.js
import express from "express";
import {
  create,
  getBlogs,
  singleGetBlogs,
} from "../controller/productController.js";

const router = express.Router();

// Middleware to add headers
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

router.post("/create", create);
router.get("/getBlogs", getBlogs);
router.get("/getBlogs/:id", singleGetBlogs);

export default router;
