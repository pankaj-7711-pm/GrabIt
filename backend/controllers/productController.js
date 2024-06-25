import productModel from "../models/productModel.js";
import sellerModel from "../models/sellerModel.js";
import wishlistModel from "../models/wishlistModel.js";

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
    if (!name || !description || price === undefined || !pics || !category) {
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
    const product = await productModel
      .findOne({ _id: pid })
      .populate("shop")
      .populate("category");
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
    const { city, page, category } = req.body;
    var sellers;
    var len;
    if (city) {
      const sel = await sellerModel.find({
        type: category,
        city: city,
      });
      len = sel.length;
      sellers = await sellerModel
        .find({
          type: category,
          city: city,
        })
        .skip((page - 1) * 6)
        .limit(6);
    } else {
      const sel = await sellerModel.find({
        type: category,
      });
      len = sel.length;
      sellers = await sellerModel
        .find({
          type: category,
        })
        .skip((page - 1) * 6)
        .limit(6);
    }

    res.status(200).send({
      success: true,
      message: "Sellers Fetched",
      sellers,
      len,
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
    if (!name || !description || price === undefined || !pics || !category) {
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

export const getAllSellersController = async (req, res) => {
  try {
    const sellers = await sellerModel.find({}).sort("-rating").limit(5);
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

export const getSingleSellerController = async (req, res) => {
  try {
    const { sid } = req.params;
    const seller = await sellerModel.findOne({ _id: sid });
    res.status(200).send({
      success: true,
      message: "Seller Fetched",
      seller,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting Sellers",
      error,
    });
  }
};

export const categoryWiseProductController = async (req, res) => {
  try {
    const { cid } = req.params;
    const { page } = req.body;
    const pro = await productModel.find({ category: cid });
    const len = pro.length;
    const products = await productModel
      .find({ category: cid })
      .skip((page - 1) * 6)
      .limit(6);
    res.status(200).send({
      success: true,
      message: "Products Fetched",
      products,
      len,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting products of the category",
      error,
    });
  }
};

export const wishlistProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const checkwishList = await wishlistModel.findOne({ product: pid, user: cid });

    if (checkwishList) {
      console.log("already widhlisted")
      return res.send({
        success: false,
        message: "Product already WishListed",
      });
    }

    const wishlist = new wishlistModel({
      product: pid,
      user: cid,
    });

    await wishlist.save();

    res.status(201).send({
      success: true,
      message: "Product Wishlisted Successfully",
    });
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in wishlisting product",
      error,
    });
  }
};

export const getWishlistController = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await wishlistModel.find({ user: cid }).populate("product");
    res.status(201).send({
      success: true,
      message: "wishlisted Products fetched successfully",
      result
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in wishlisting product",
      error,
    });
  }
}

export const deleteWishlistController = async (req, res) => {
  try {
    const { pid } = req.params;
    await wishlistModel.findByIdAndDelete(pid);
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    }); 
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting wishlisted product",
      error,
    });
  }
}
