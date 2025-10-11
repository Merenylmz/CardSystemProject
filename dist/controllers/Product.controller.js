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
exports.editProduct = exports.deleteProduct = exports.addProduct = exports.getByIdProduct = exports.getAllProduct = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const configureRedis_1 = __importDefault(require("../libs/redis/configureRedis"));
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products;
        const cacheProducts = yield configureRedis_1.default.exists("products");
        if (cacheProducts) {
            const cached = yield configureRedis_1.default.get("products");
            products = JSON.parse(cached);
        }
        else {
            products = yield Product_model_1.default.find();
            configureRedis_1.default.set("products", JSON.stringify(products));
        }
        res.send({ status: true, products });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllProduct = getAllProduct;
const getByIdProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products;
        if (yield configureRedis_1.default.exists("products")) {
            const cached = yield configureRedis_1.default.get("products");
            products = JSON.parse(cached);
        }
        else {
            products = yield Product_model_1.default.find();
        }
        const product = products.filter((p) => p._id == req.params.id);
        res.send({ status: true, product });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getByIdProduct = getByIdProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new Product_model_1.default(req.body);
        yield newProduct.save();
        yield configureRedis_1.default.del("products");
        res.send({ status: true, newProduct });
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.addProduct = addProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_model_1.default.findOne({ _id: req.params.id });
        if (!product) {
            return res.send({ status: false, msg: "Product is not found" });
        }
        yield configureRedis_1.default.del("products");
        yield product.deleteAfterDelOrder(req.params.orderId, product._id);
        res.send({ status: true });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProduct = deleteProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editedProduct = yield Product_model_1.default.findOneAndUpdate({ _id: req.params.id }, req.body);
        yield configureRedis_1.default.del("products");
        res.send({ status: true, editedProduct });
    }
    catch (error) {
        console.log(error);
    }
});
exports.editProduct = editProduct;
