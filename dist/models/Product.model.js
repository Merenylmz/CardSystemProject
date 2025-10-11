"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const Order_model_1 = __importDefault(require("./Order.model"));
const productSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    views: { type: Number, default: 0 },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users", required: true, autoPopulate: true },
    price: Number
});
productSchema.index({ title: 1, price: -1 });
productSchema.plugin(mongoose_autopopulate_1.default);
productSchema.methods.deleteAfterDelOrder = function (orderId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield Order_model_1.default.findOne({ _id: orderId });
        if (!order || !Array.isArray(order.products)) {
            throw new Error("Order veya ürün listesi bulunamadı");
        }
        const editedOrderArray = order.products.filter((p) => p._id.toString() !== productId.toString());
        order.set("products", editedOrderArray);
        yield order.save();
        return true;
    });
};
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
