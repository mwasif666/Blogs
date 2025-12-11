import express from "express";
import {
  create,
  getBlogs,
  singleGetBlogs,
} from "../controller/productController.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


const upload = multer({ storage: storage });

const route = express.Router();
route.post("/create", upload.array("thumbnail"), create);
route.get("/getBlogs", getBlogs);
route.get("/getBlogs/:id", singleGetBlogs);

export default route;
