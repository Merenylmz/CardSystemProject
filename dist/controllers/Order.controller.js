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
exports.getOrder = exports.newOrder = void 0;
const Order_model_1 = __importDefault(require("../models/Order.model"));
const configureRMQ_1 = require("../libs/rabbitmq/configureRMQ");
const User_model_1 = __importDefault(require("../models/User.model"));
const newOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = new Order_model_1.default(req.body);
        yield newOrder.save();
        (0, configureRMQ_1.sendToQueue)({
            type: "sendMail",
            payload: {
                to: req.body.email,
                subject: "Your Order is Ready",
                body: `<h1>Order</h1> <p>Thanks For your order :)</p>`
            }
        });
        res.send(newOrder);
    }
    catch (error) {
        console.log(error);
    }
});
exports.newOrder = newOrder;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.findOne({ email: req.query.email });
        if (!user) {
            return res.send({ status: false, msg: "..." });
        }
        const orders = yield Order_model_1.default.find({ userId: user._id });
        res.send(orders);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOrder = getOrder;
