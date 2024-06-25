import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    chat: {
      type: mongoose.ObjectId,
      ref: "chat",
      required: true,
    },
    sender: {
      type: String,
      required:true,
    },
    senderRole:{
        type: String,
        required:true
    }
  },
  { timestamps: true }
);

export default mongoose.model("message", messageSchema);
