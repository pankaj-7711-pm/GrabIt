import mongoose from "mongoose";

const sellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  pics: [
    {
      type: String,
    },
  ],
  isSeller: {
    type: Boolean,
    required: true,
    default: true,
  },
  type: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
});

export default mongoose.model("seller", sellerSchema);
