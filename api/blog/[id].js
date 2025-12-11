import connect from "../../../lib/mongoose.js";
import Blog from "../../../models/Blog.js";

export default async function handler(req, res) {
  await connect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      return res.status(200).json(blog);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  res.setHeader("Allow", "GET");
  return res.status(405).end("Method Not Allowed");
}
