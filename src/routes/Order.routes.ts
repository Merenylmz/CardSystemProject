import express from "express";
import { getOrder, newOrder } from "../controllers/Order.controller";
import isLogin from "../middleware/isLogin";
const router = express.Router();

router.post("/neworder", isLogin, newOrder);
router.get("/", getOrder);

export default router;