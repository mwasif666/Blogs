// api/getBlogs.js
import connect from "../lib/mongoose.js";
import Blog from "../models/projectModels.js";

export default async function handler(req, res) {
  await connect();

  if (req.method === "GET") {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end("Method Not Allowed");
}
