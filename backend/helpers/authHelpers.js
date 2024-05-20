import JWT from "jsonwebtoken";
import sellerModel from "../models/sellerModel.js";

//protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//Seller access
export const isSeller = async (req, res, next) => {
  try {
    const user = await sellerModel.findById(req.user._id);
    if (user) {
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
