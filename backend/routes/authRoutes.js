import express from "express";
import { loginController, loginSellerController, registerCustomerController, registerSellerController, sendOtpController, updateCustomerController, updateSellerController } from "../controllers/authController.js";
import { isSeller, requireSignIn } from "../helpers/authHelpers.js";


const router = express.Router();

//register
router.post("/register-customer", registerCustomerController);
router.post("/register-seller", registerSellerController);
router.post("/login-customer", loginController);
router.post("/login-seller", loginSellerController);
router.put("/update-seller", requireSignIn, isSeller, updateSellerController);
router.put("/update-customer", requireSignIn, updateCustomerController);
router.post("/sendotp", sendOtpController);

//protected user routes auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protected admin routes auth
router.get("/seller-auth", requireSignIn, isSeller, (req, res) => {
    res.status(200).send({ ok: true });
});


export default router;