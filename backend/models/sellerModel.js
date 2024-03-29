import mongoose from "mongoose";

const sellerSchema = mongoose.Schema(
  {
    shop_name: {
      type: String,
      required: true,
    },
    owner_name: {
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
    profile_pic: {
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
    shop_type: {
      type: String,
      required: true,
    },
  },
  { timestaps: true }
);

export default mongoose.model("seller", sellerSchema);
