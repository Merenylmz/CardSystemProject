"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_controller_1 = require("../controllers/Product.controller");
const router = express_1.default.Router();
router.get("/", Product_controller_1.getAllProduct);
router.get("/:id", Product_controller_1.getByIdProduct);
router.post("/add", Product_controller_1.addProduct);
exports.default = router;
