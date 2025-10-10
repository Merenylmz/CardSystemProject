"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const productSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    views: { type: Number, default: 0 },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users", required: true, autoPopulate: true },
    price: Number
});
productSchema.index({ name: 1, price: -1 });
productSchema.plugin(mongoose_autopopulate_1.default);
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
