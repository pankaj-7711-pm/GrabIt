import express from "express";
import { isSeller, requireSignIn } from "../helpers/authHelpers.js";
import { createReviewController } from "../controllers/reviewController.js";

const router = express.Router();


router.post("/review-seller/:sid/:cid",requireSignIn, createReviewController);








export default router;