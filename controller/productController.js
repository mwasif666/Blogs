import Blog from "../models/projectModels.js";

export const create = async (req, res) => {
  try {
    let thumbnails = [];

    // Agar files aaye hain
    if (req.files && req.files.length > 0) {
      thumbnails = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        alt: file.originalname,
      }));
    }

    const blogData = {
      ...req.body,

      // Auto detect:
      // 1 image ⇒ object
      // multiple ⇒ array
      thumbnail:
        thumbnails.length === 0
          ? null
          : thumbnails.length === 1
          ? thumbnails[0]
          : thumbnails,
    };

    const savedBlog = await Blog.create(blogData);

    res.status(200).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(200).json(blog);
  } catch (error) {
    res.staus(500).json({ message: error.message });
  }
};

export const singleGetBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.staus(500).json({ message: error.message });
  }
};
