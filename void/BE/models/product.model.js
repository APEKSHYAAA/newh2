import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fund_needed: {
        type: Number,
        required: true
    },
    fund_raise: {
        type: Number,
        required: true
    },
    perks: {
        type: [String],  // Assuming perks are stored as an array of strings
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        enum: ['Food', 'Grocery', 'Clothes', 'Repair', 'Electronics'],
        required: true
    }
},
    {
        timestamps: true
    });

const Product = mongoose.model("Product", productSchema);

export default Product;
