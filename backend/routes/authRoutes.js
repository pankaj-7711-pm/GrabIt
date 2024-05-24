import express from "express";
import { loginController, loginSellerController, registerCustomerController, registerSellerController, sendOtpController } from "../controllers/authController.js";


const router = express.Router();

//register
router.post("/register-customer", registerCustomerController);
router.post("/register-seller", registerSellerController);
router.post("/login-customer", loginController);
router.post("/login-seller", loginSellerController);
router.post("/sendotp", sendOtpController);


export default router;