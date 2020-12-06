import mongoose from "mongoose";

const Comments = mongoose.Schema({
  post: String,
  user: String,
  body: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  replyCount: {
    type: Number,
    default: 0,
  },
});

const Comment = mongoose.model("Comments", Comments);

export default Comment;
