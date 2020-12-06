import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { auth } from "./middleware/auth.js";
import dotenv from "dotenv";

import {
  getPosts,
  createPosts,
  getPostDetails,
  createComment,
  likePost,
  deletePost,
  deleteComment,
} from "./routes/posts.js";

import { createUser, login, userDetails, ownDetails } from "./routes/users.js";

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Post Requests
app.get("/posts", getPosts);
app.post("/posts", auth, createPosts);
app.get("/posts/:id", getPostDetails);
app.get("/posts/:id/like", auth, likePost);
app.post("/posts/:id/comment", auth, createComment);
app.delete("/posts/:id", auth, deletePost);
app.delete("/comments/:id", auth, deleteComment);

// User Requests
app.post("/users/signup", createUser);
app.post("/users/login", login);
app.get("/users/:username", userDetails);
app.get("/user", auth, ownDetails);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("useUnifiedTopology", true);
