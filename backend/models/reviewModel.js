import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  shop: {
    type: mongoose.ObjectId,
    ref: "seller",
    required: true,
  },
  message: {
    type: String,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "customer",
    required: true,
  },
});

export default mongoose.model("review", reviewSchema);
