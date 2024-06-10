import sellerModel from "../models/sellerModel.js";
import customerModel from "../models/customerModel.js";
import { comparePassword, hashPassword } from "../middlewares/authMiddleware.js";
import JWT from "jsonwebtoken";
import { json } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

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
      name,
      owner,
      address,
      pincode,
      discription,
      phone,
      city,
      state,
      email,
      password,
      pic,
      pics,
      type,
      isSeller,
    
    } = req.body;

    //validation
    if (
      !name ||
      !owner ||
      !address ||
      !pincode ||
      !phone ||
      !city ||
      !state ||
      !email ||
      !password ||
      !type || !discription
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
      name,
      owner,
      address,
      pincode,
      discription,
      phone,
      city,
      state,
      email,
      password: hashedPassword,
      pic,
      pics,
      type,
      isSeller: true,
    });
    await user.save();
    res.status(201).send({
      success: true,
      message: "Registered Successfully",
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

export const sendOtpController = async (req, res) => {
  const { email } = req.body;
  const temp = Math.floor(1000 + Math.random() * 9000);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_M,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: "pankajmandalplt58@gmail.com",
    to: email,
    subject: "Welcome to GrabIt",
    text: `Hii User your OTP for registration is ${temp}. Enter it in your registration page to verify your email.`,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Eamil sent successfully");
    res.send({
      success: true,
      message: "Otp generated Successfully",
      temp,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateSellerController = async (req, res) => {
  try {
    const {
      name,
      owner,
      address,
      pincode,
      discription,
      phone,
      city,
      state,
      email,
      password,
      pic,
      pics,
      isSeller,
    } = req.body;

    //validation
    if (
      !name ||
      !owner ||
      !address ||
      !pincode ||
      !phone ||
      !city ||
      !state ||
      !email ||
      !password ||
      !discription || !pics || !pic
    ) {
      return res.send({ message: "All fields are required" });
    }


    //Update user 
    const hashedPassword = await hashPassword(password);
    const user = await sellerModel.findByIdAndUpdate(
      req.user._id,
      { ...req.body, password: hashedPassword },
      { new: true }
    );
    // await user.save();

    res.status(201).send({
      success: true,
      message: "Profile updated Successfully",
      user,
    });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating profile",
      error,
    });
  }
}