import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import multer from "multer";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded as any;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
}

export function multerError(err: any, req: any, res: any, next: any) {
    if (multer.MulterError) {
        return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: 'Unexpected error occurred' });
}
