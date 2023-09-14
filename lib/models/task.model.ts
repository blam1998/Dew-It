import mongoose from "mongoose";
import { NodeNextRequest } from "next/dist/server/base-http/node";
import { number } from "zod";

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    default: "",
  },
  description:
    {
      type: String,
    },
  timeOffset:{
    type: Number,
  }
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;