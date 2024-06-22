import express from "express";
import { isSeller, requireSignIn } from "../helpers/authHelpers.js";
import { createCategoryController, deleteCategoryController, getCategoryController, getSingleCategoryController, updateCategoryController } from "../controllers/categoryController.js";


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

//get single category
router.get("/get-single-category/:cid", getSingleCategoryController);

//delete category
router.delete(
  "/delete-category/:cid",
  requireSignIn,
  isSeller,
  deleteCategoryController
);

export default router;