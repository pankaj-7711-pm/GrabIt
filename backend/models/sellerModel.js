const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema(
  {
    company: {
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
    pic: [
      {
        type: String,
      },
    ],
    isSeller: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestaps: true }
);

const sellerMod = mongoose.model("Seller", sellerSchema);
module.exports = sellerMod;
