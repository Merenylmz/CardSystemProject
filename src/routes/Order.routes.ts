import express from "express";
import { getOrder, newOrder } from "../controllers/Order.controller";
import isLogin from "../middleware/isLogin";
const router = express.Router();

router.post("/neworder", newOrder);
router.get("/", isLogin, getOrder);

export default router;