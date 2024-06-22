import express from "express";
import { isSeller, requireSignIn } from "../helpers/authHelpers.js";
import {
  categoryWiseProductController,
  createProductController,
  deleteProductController,
  getAllProductOfLocationController,
  getAllProductOfSellerController,
  getAllSellersController,
  getAllSellersOfLocationController,
  getSingleProductController,
  getSingleSellerController,
  updateProductController,
  wishlistProductController,
} from "../controllers/productController.js";

const router = express.Router();

//create product
router.post(
  "/create-product",
  requireSignIn,
  isSeller,
  createProductController
);

//get all products of a particular seller
router.get("/get-product/:sid", getAllProductOfSellerController);

//get single product
router.get("/get-single-product/:pid", getSingleProductController);

//get all products of a particular location
router.get("/get-product-location", getAllProductOfLocationController);

// get all sellers of a particular location
router.post("/get-sellers-category", getAllSellersOfLocationController);

// get all sellers
router.get("/get-all-sellers", getAllSellersController);

// get all sellers
router.get("/get-single-seller/:sid", getSingleSellerController);

// get all products
router.post("/category-wise-products/:cid", categoryWiseProductController);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isSeller,
  updateProductController
);

//delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isSeller,
  deleteProductController
);

// wishlist product
router.post("/wishlist/:pid/:cid", wishlistProductController);


export default router;

// hii
