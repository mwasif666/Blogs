// api/getBlogs.js
import connect from "../lib/mongoose.js";
import Blog from "../models/projectModels.js";

export default async function handler(req, res) {
  // 1️⃣ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 2️⃣ Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (!process.env.MONGO_URL) {
      return res
        .status(500)
        .end(
          "MONGO_URL missing — please set the MONGO_URL environment variable"
        );
    }

    await connect(); // Connect to MongoDB

    if (req.method === "GET") {
      const blogs = await Blog.find()
        .populate("category", "title")
        .populate("author", "name")
        .sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    }

    res.setHeader("Allow", ["GET"]);
    return res.status(405).end("Method Not Allowed");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}
