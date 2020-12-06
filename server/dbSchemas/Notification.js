import mongoose from "mongoose";

const notifications = mongoose.Schema({
  sender: String,
  recipient: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  type: String,
});

const Notification = mongoose.model("notifications", notifications);

export default Notification;
