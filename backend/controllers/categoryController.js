import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import sellerModel from "../models/sellerModel.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.send({success:false, message: "All fields are required" });
        }
        const category = new categoryModel({
            name,
            shop: req.user._id
        })
        await category.save();
        res.status(201).send({
          success: true,
          message: "Category Created Successfully",
        });
    } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error in creating Category",
          error,
        });
    }
};

export const updateCategoryController = async (req,res) => {
    try {
        const { name } = req.body;
        const { cid } = req.params;
        if (!name) {
          return res.send({
            success: false,
            message: "All fields are required",
          });
        }
        const category = await categoryModel.findOneAndUpdate(
          { _id: cid, shop: req.user._id },
          { name: name },
          { new: true }
        );

        res.status(200).send({
          success: true,
          message: "Category Updated Successfully",
          category,
        });


    } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error in Updating Category",
          error,
        });
    }
}

export const getCategoryController = async (req, res) => {
    try {
        const { sid } = req.params;
        const category = await categoryModel.find({shop:sid});
        res.status(200).send({
          success: true,
          message: "All categories",
          category,
        });
    } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error in getting Categories",
          error,
        });
    }
}