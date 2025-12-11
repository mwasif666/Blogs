import mongoose from "mongoose";

// BlogCategory Schema
const blogCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

// Blog Schema
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    thumbnail: { type: mongoose.Schema.Types.Mixed, default: null }, // single or multiple
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    tags: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    readingTime: { type: Number, default: 3 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    meta: { title: String, description: String, keywords: String },
    views: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const BlogCategory =
  mongoose.models.BlogCategory ||
  mongoose.model("BlogCategory", blogCategorySchema);
export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
