import express from "express";
import { isSeller, requireSignIn } from "../helpers/authHelpers.js";
import { createReviewController, getReviewController } from "../controllers/reviewController.js";

const router = express.Router();


router.post("/review-seller/:sid/:cid", requireSignIn, createReviewController);

router.get("/seller-all-reviews/:sid", getReviewController);








export default router;