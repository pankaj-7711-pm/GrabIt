import mongoose from "mongoose";

const reviewProductSchema = mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.ObjectId,
    ref: "product",
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

export default mongoose.model("reviewProduct", reviewProductSchema);