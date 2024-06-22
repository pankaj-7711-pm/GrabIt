import express from "express";
import { isSeller, requireSignIn } from "../helpers/authHelpers.js";
import { createReviewController, createReviewProductController, getProductReviewController, getReviewController } from "../controllers/reviewController.js";

const router = express.Router();


router.post("/review-seller/:sid/:cid", requireSignIn, createReviewController);

router.post("/review-product/:pid/:cid", requireSignIn, createReviewProductController);

router.get("/seller-all-reviews/:sid", getReviewController);

router.get("/product-all-reviews/:pid", getProductReviewController);








export default router;