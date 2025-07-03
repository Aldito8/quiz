import { Request, Response } from "express";
import { userUpload } from "../services/auth";

export async function uploadFile(req: Request, res: Response) {

    const user = (req as any).user
    try {
        if (!user) {
            res.status(400).json({ message: "user not found" })
        }
        if (!req.file) {
            res.status(400).json({ message: "no file uploaded" });
            return;
        }
        const profile = req.file.filename;
        console.log(user.id)

        const updateProfile = await userUpload(user.id, profile)

        res.status(201).json({ message: "succes update profile", updateProfile });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}
