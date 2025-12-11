// api/getBlogs/[id].js
import connect from "../../lib/mongoose.js";
import Blog from "../../models/projectModels.js";

export default async function handler(req, res) {
  await connect();
  const { id } = req.query;

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
