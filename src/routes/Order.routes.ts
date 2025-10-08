import express from "express";
import { getOrder, newOrder } from "../controllers/Order.controller";
const router = express.Router();

router.post("/neworder", newOrder);
router.get("/", getOrder);

export default router;