import mongoose from "mongoose";

const Likes = mongoose.Schema({
  post: String,
  user: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Like = mongoose.model("Likes", Likes);

export default Like;
