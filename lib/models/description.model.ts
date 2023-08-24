import mongoose from "mongoose";
import { NodeNextRequest } from "next/dist/server/base-http/node";

const descriptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true
  }
});

const Description = mongoose.models.Description || mongoose.model("Description", descriptionSchema);

export default Description;