import express from "express";
import { isSeller, requireSignIn } from "../helpers/authHelpers.js";
import { createCategoryController, getCategoryController, updateCategoryController } from "../controllers/categoryController.js";


const router = express.Router();

//create category
router.post(
  "/create-category",
  requireSignIn,
  isSeller,
  createCategoryController
);

//Update category
router.put(
  "/update-category/:cid",
  requireSignIn,
  isSeller,
  updateCategoryController
);

//get category
router.get(
  "/get-category/:sid",
  getCategoryController
);

export default router;