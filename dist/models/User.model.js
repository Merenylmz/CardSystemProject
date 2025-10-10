"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Orders", required: false, autoPopulate: true },
    lastLoginToken: { type: String, required: false }
});
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});
userSchema.plugin(mongoose_autopopulate_1.default);
const Users = mongoose_1.default.model("Users", userSchema);
exports.default = Users;
