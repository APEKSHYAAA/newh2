import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.log("Error Fetching products", error.message);
    }
    return res.status(500).json({ success: false, message: "Server Error" });
};

export const createProducts = async (req, res) => {
    const { name, fund_needed, fund_raise, perks, description, image } = req.body;

    if (!name || !fund_needed || !fund_raise || !perks || !description || !image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product({
        name,
        fund_needed,
        fund_raise,
        perks,
        description,
        image
    });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error) {
        console.error("Error in Create Product", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProducts = async (req, res) => {
    const { id } = req.params;
    const { name, fund_needed, fund_raise, perks, description, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, fund_needed, fund_raise, perks, description, image },
            { new: true }
        );
        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProducts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    }
    catch (error) {
        console.log("Error in deleting Product", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
