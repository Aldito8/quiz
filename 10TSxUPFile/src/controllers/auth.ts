import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth";
import { loginSchema, registerSchema } from "../validation/auth";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";

export async function handleRegister(req: Request, res: Response) {
    try {
        const { error } = registerSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return;
        }

        if (!req.file) {
            res.status(400).json({ message: "no file uploaded" })
            return
        }

        const { email, password } = req.body
        const profile = req.file.filename


        const user = await registerUser(email, password, profile)
        res.status(201).json({ message: "User registered", user })
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export async function handleLogin(req: Request, res: Response) {
    try {
        const { error } = loginSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return
        }

        const { email, password } = req.body

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" })
            return
        }

        const result = await loginUser(email, password)
        if (!result) {
            res.status(401).json({ message: "Invalid credentials" })
            return
        }

        const token = signToken({ id: user.id, role: user.role, email: user.email })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24
        });

        res.status(200).json({ message: "Login success" })
    } catch (err: any) {
        res.status(401).json({ message: err.message })
    }
}

export async function handleLogout(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ success: false, message: "Logout failed" })
            return
        }

        res.clearCookie("token");

        res.status(200).json({ success: true, message: "Logout successful" })
    });
}

export function requireSession(req: Request, res: Response, next: NextFunction) {
    if (!req.session) {
        res.status(401).json({ message: "Session expired or unauthorized" })
        return
    }
    next()
}
