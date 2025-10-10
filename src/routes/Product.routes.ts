import express from "express";
import { addProduct, getAllProduct, getByIdProduct } from "../controllers/Product.controller";
const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getByIdProduct);
router.post("/add", addProduct);

export default router;