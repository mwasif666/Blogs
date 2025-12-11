// api/createBlog.js
import connect from "../lib/mongoose.js";
import Blog from "../models/Blog.js";

export default async function handler(req, res) {
  await connect();

  if (req.method === "POST") {
    try {
      const blog = await Blog.create(req.body);
      return res.status(201).json(blog);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end("Method Not Allowed");
}
