import sellerModel from "../models/sellerModel.js";
import customerModel from "../models/customerModel.js";
import { comparePassword, hashPassword } from "../middlewares/authMiddleware.js";
import JWT from "jsonwebtoken";

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


export const loginController =async (req,res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await customerModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Login",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        pic: user.pic,
        isSeller: user.isSeller,
      },
      token,
    });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
}

export const loginSellerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    var user = await sellerModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "Seller not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Login",
      });
    }
    user = await sellerModel.findOne({ email }).select("-password");
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfull",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};