import productModel from "../models/productModel.js";
import sellerModel from "../models/sellerModel.js";

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      pics,
      available,
      inoffer,
      category,
      offerPrice,
    } = req.body;
    if (
      !name ||
      !description ||
      price === undefined ||
      !pics ||
      !category
    ) {
      return res.send({ message: "All fields are required" });
    }
    const products = new productModel({
      ...req.body,
      shop: req.user._id,
    });
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

export const getAllProductOfSellerController = async (req, res) => {
  try {
    const { sid } = req.params;
    const products = await productModel.find({ shop: sid });
    res.status(200).send({
      success: true,
      message: "Products Fetched",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findOne({ _id: pid }).populate("shop").populate("category");
    res.status(200).send({
      success: true,
      message: "Product Fetched",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting product",
      error,
    });
  }
};

export const getAllProductOfLocationController = async (req, res) => {
  try {
    const { city } = req.body;
    const sellers = await sellerModel.find({ city: city }).select("_id");
    const shopIds = sellers.map((seller) => seller._id);
    const products = await productModel
      .find({ shop: { $in: shopIds } })
      .populate({
        path: "shop",
        select: "-password",
      })
      .sort({ rating: -1 });
    res.status(200).send({
      success: true,
      message: "Products Fetched",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

export const getAllSellersOfLocationController = async (req, res) => {
  try {
    const { city } = req.body;
    const sellers = await sellerModel.find({ city: city });
    res.status(200).send({
      success: true,
      message: "Sellers Fetched",
      sellers,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting Sellers",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      pics,
      available,
      inoffer,
      offerPrice,
      category,
    } = req.body;
    if (
      !name ||
      !description ||
      price === undefined ||
      !pics ||
      !category
    ) {
      return res.send({ message: "All fields are required" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.body, shop: req.user._id },
      { new: true }
    );
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating products",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error, 
    });
  }
};
