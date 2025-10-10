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
exports.addProduct = exports.getByIdProduct = exports.getAllProduct = void 0;
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
    }
    catch (error) {
        console.log(error);
    }
});
exports.addProduct = addProduct;
