import mongoose from "mongoose";

const Users = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
});

const User = mongoose.model("Users", Users);

export default User;
