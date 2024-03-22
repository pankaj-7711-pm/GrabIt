import sellerModel from "../models/sellerModel.js";
import customerModel from "../models/customerModel.js";
import { hashPassword } from "../middlewares/authMiddleware.js";

export const registerCustomerController = async (req, res) => {
  try {
    const { name, phone, email, password, pic } = req.body;

    //validation
    if (!name || !phone || !email || !password) {
      return res.send({ message: "All fields are required" });
    }

    //check user
    const existingUser = await customerModel.findOne({ email });

    // existing user
    if (existingUser) {
      return res.send({
        success: false,
        message: "Already Registered Please Login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const user = new customerModel({
      name,
      phone,
      email,
      password: hashedPassword,
      pic,
      isSeller: false,
    });
    await user.save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const registerSellerController = async (req, res) => {
  try {
    const {
      shop_name,
      owner_name,
      address,
      pincode,
      phone,
      city,
      state,
      email,
      password,
      profile_pic,
      pics,
      shop_type,
    } = req.body;

    //validation
    if (
      !shop_name ||
      !owner_name ||
      !address ||
      !pincode ||
      !phone ||
      !city ||
      !state ||
      !email ||
      !password ||
      !shop_type
    ) {
      return res.send({ message: "All fields are required" });
    }

    //check user
    const existingUser = await sellerModel.findOne({ email });

    // existing user
    if (existingUser) {
      return res.send({
        success: false,
        message: "Already Registered Please Login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const user = new sellerModel({
      shop_name,
      owner_name,
      address,
      pincode,
      phone,
      city,
      state,
      email,
      password: hashedPassword,
      profile_pic,
      pics,
      shop_type,
      isSeller: true,
    });
    await user.save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
