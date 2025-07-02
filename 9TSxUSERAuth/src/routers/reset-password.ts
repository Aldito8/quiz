import express from "express";
import { handleResetPassword } from "../controllers/reset-password";

const router = express.Router();

router.put("/reset-password", handleResetPassword);

export default router;
