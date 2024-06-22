import productModel from "../models/productModel.js";
import sellerModel from "../models/sellerModel.js";
import reviewModel from "../models/reviewModel.js";
import reviewModelProduct from "../models/reviewModelProduct.js";

export const createReviewController = async (req, res) => {
  try {
    const { sid, cid } = req.params;
    const { rating, message } = req.body;
    const rate = new reviewModel({
      ...req.body,
      shop: sid,
      user: cid,
    });
    await rate.save();

    const ratings = await reviewModel.find({ shop: sid });
    const len = ratings.length;
    let sum = 0;
    for (var i = 0; i < len; i++) {
        sum = sum + ratings[i].rating;
    }
    const avg=sum/len;
    
    const seller = await sellerModel.findByIdAndUpdate(
      sid,
      { rating:avg },
      { new: true }
    );
    await seller.save();

    res.status(201).send({
      success: true,
        message: "Rating is Successfull",
      avg
    });
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Rating Seller",
      error,
    });
  }
};


export const getReviewController = async (req, res) => {
  try {
    const { sid } = req.params;
    const reviews = await reviewModel.find({ shop: sid }).populate("user");
    res.status(201).send({
      success: true,
      message: "review fetched successfully",
      reviews
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in geting reviews of a seller",
      error,
    });
  }
}

export const createReviewProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const { rating, message } = req.body;
    const rate = new reviewModelProduct({
      ...req.body,
      product: pid,
      user: cid,
    });
    await rate.save();

    const ratings = await reviewModelProduct.find({ product: pid });
    const len = ratings.length;
    let sum = 0;
    for (var i = 0; i < len; i++) {
      sum = sum + ratings[i].rating;
    }
    const avg = sum / len;

    const product = await productModel.findByIdAndUpdate(
      pid,
      { rating: avg },
      { new: true }
    );
    await product.save();

    res.status(201).send({
      success: true,
      message: "Rating is Successfull",
      avg,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Rating the product",
      error,
    });
  }
}

export const getProductReviewController = async (req, res) => {
  try {
    const { pid } = req.params;
    const reviews = await reviewModelProduct.find({ product: pid }).populate("user");
    res.status(201).send({
      success: true,
      message: "review fetched successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in geting reviews of the product",
      error,
    });
  }
};