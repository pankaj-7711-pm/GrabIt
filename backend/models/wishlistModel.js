import mongoose from "mongoose";

const wishListSchema = mongoose.Schema({
  product: {
    type: mongoose.ObjectId,
    ref: "product",
    required: true,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "customer",
    required: true,
  },
},{ timestamps: true });

export default mongoose.model("wishList", wishListSchema);
