"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const orderSchema = new mongoose_1.default.Schema({
    content: String,
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users", required: true, autoPopulate: true },
    products: [{
            product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product", autoPopulate: true },
            quantity: Number
        }],
}, { timestamps: true });
orderSchema.methods.configureQuantity = function () {
    // return this.products.filter()
};
orderSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
orderSchema.plugin(mongoose_autopopulate_1.default);
// orderSchema.plugin(mongooseDelete, {overrideMethods: "all"});
const Orders = mongoose_1.default.model("Orders", orderSchema);
exports.default = Orders;
