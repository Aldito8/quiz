import express from "express";
import { handleRegister, handleLogin, handleSupplierLogin } from "../controllers/auth";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/supplier/login", handleSupplierLogin);

router.get("/me", authenticate, (req, res) => {
    res.json({ message: "Protected route" });
});

export default router;