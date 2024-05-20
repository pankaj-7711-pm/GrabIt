import express from "express";
import { isSeller, requireSignIn } from "../helpers/authHelpers.js";
import {
  createProductController,
  deleteProductController,
  getAllProductOfLocationController,
  getAllProductOfSellerController,
  getAllSellersOfLocationController,
  getSingleProductController,
  updateProductController,
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
router.get("/get-sellers-location", getAllSellersOfLocationController);

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


export default router;
