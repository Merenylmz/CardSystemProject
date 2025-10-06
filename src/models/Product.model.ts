import mongoose from "mongoose";
import autoPopulate from "mongoose-autopopulate";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    views: {type: Number, default: 0},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, autoPopulate: true},
    price: Number
});

productSchema.index({name: 1, price: -1});

productSchema.plugin(autoPopulate);

const Product = mongoose.model("Product", productSchema);

export default Product;