import connect from "../../lib/mongoose.js";
import Blog from "../../models/projectModels.js";

export default async function handler(req, res) {
  await connect();

  if (req.method === "GET") {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const saved = await Blog.create(req.body);
      return res.status(201).json(saved);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  res.setHeader("Allow", "GET,POST");
  return res.status(405).end("Method Not Allowed");
}
