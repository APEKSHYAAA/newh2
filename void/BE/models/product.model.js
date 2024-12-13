import mongoose, { trusted } from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fund_needed: {
        type: Number,
        required: true
    },
    fund_raised: {
        type: Number,
        required: true
    },
    perks: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

const Product = mongoose.model("Product", productSchema);

export default Product;