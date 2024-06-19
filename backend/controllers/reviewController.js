import productModel from "../models/productModel.js";
import sellerModel from "../models/sellerModel.js";
import reviewModel from "../models/reviewModel.js";

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
