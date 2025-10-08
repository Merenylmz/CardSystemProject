import express from "express";
import { register } from "../controllers/Auth.controller";
const router = express.Router();

router.post("/register", register);

export default router;