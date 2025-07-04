import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { verifyToken } from "../utils/jwt"

export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.token
        if (!token) {
            res.status(401).json({ message: "Unauthorized" })
            return
        }

        const user = verifyToken(token);
        (req as any).user = user
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" })
        return
    }
}

export function multerError(err: any, req: any, res: any, next: any) {
    if (multer.MulterError) {
        res.status(400).json({ error: err.message })
        return
    }

    res.status(500).json({ error: 'Unexpected error occurred' })
}
