"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_controller_1 = require("../controllers/Order.controller");
const isLogin_1 = __importDefault(require("../middleware/isLogin"));
const router = express_1.default.Router();
router.post("/neworder", Order_controller_1.newOrder);
router.get("/", isLogin_1.default, Order_controller_1.getOrder);
exports.default = router;
