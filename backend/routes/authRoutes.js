import express from "express";
import { registerCustomerController, registerSellerController } from "../controllers/authController.js";


const router = express.Router();

//register
router.post("/register-customer", registerCustomerController);
router.post("/register-seller", registerSellerController);
// router.post("/login", loginController);



export default router;