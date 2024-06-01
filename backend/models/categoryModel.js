import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shop: {
    type: mongoose.ObjectId,
    ref: "seller",
    required: true,
  },
});

export default mongoose.model("category", categorySchema);
