import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: "true",
    },
    pics: [{ type: String }],
    shop: {
      type: mongoose.ObjectId,
      ref: "seller",
      required: true,
    },
    rating: {
      type: Number,
      default: 0.0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    inoffer: {
      type: Boolean,
      default: false,
    },
    offerPrice: {
      type: Number,
      default:null,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware to set offerPrice to the value of price if offerPrice is not set
productSchema.pre('save', function (next) {
  if (this.isNew && this.offerPrice == null) {
    this.offerPrice = this.price;
  }
  next();
});

export default mongoose.model("product", productSchema);
