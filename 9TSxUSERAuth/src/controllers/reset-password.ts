import { Request, Response } from "express";
import { resetPasswordSchema } from "../validation/auth";
import { resetPassword } from "../services/auth";

export const handleResetPassword = async (req: Request, res: Response) => {
    try {
        const { error } = resetPasswordSchema.validate(req.body)

        if (error) {
            res.status(400).json({ message: error.message })
            return
        }

        const { email, password, newPassword } = req.body
        await resetPassword(email, password, newPassword)

        res.json({ message: "Password updated successfully" })
    } catch (error) {
        res.status(400).json({ message: `${error}` });
    }
}