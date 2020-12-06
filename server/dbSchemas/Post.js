import mongoose from "mongoose";

const posts = mongoose.Schema({
  title: { type: String, unique: true },
  author: String,
  body: String,
  tags: [String],
  images: [String],
  visitCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("posts", posts);

export default Post;
