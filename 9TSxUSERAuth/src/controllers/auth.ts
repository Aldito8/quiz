import { Request, Response } from "express";
import { registerUser, loginUser, loginSupllier } from "../services/auth";
import { loginSchema, registerSchema } from "../validation/auth";

export async function handleRegister(req: Request, res: Response) {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }

        const { email, password } = req.body;
        const user = await registerUser(email, password);
        res.status(201).json({ message: "User registered", user });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export async function handleLogin(req: Request, res: Response) {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }

        const { email, password } = req.body;

        const result = await loginUser(email, password);

        res.json({ message: "Login user success", ...result });

    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
}

export async function handleSupplierLogin(req: Request, res: Response) {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }

        const { email, password } = req.body;

        const result = await loginUser(email, password);

        if (result.data.role !== "supplier") {
            res.json({ message: "user not a supplier" });
            return
        }

        res.json({ message: "Login supplier success", ...result });

    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
}
