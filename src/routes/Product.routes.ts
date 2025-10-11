import express from "express";
import { addProduct, deleteProduct, editProduct, getAllProduct, getByIdProduct } from "../controllers/Product.controller";
const router = express.Router();

router.post("/add", addProduct);
router.get("/", getAllProduct);
router.get("/:id", getByIdProduct);
router.post("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct)

export default router;