import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "customer",
      required: true,
    },
    seller: {
      type: mongoose.ObjectId,
      ref: "seller",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("chat", chatSchema);
