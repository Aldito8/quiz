import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const transferPoints = async (req: Request, res: Response, next: any) => {
    const { senderId, receiverId, amount } = req.body
    try {
        if (amount <= 0) {
            throw { status: 400, message: 'point harus lebih dari 0' }
        }
        const [sender, receiver] = await Promise.all([
            prisma.user.findUnique({ where: { id: senderId } }),
            prisma.user.findUnique({ where: { id: receiverId } })
        ])

        if (!sender) {
            res.status(400).json({ message: 'pengirim tidak ditemukan' })
            return;
        }
        if (!receiver) {
            res.status(400).json({ message: 'penerima tidak ditemukan' })
            return;
        }

        if (sender.points < amount) {
            res.status(400).json({ message: 'point tidak cukup' })
            return;
        }

        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: senderId },
                data: { points: { decrement: amount } }
            })

            await tx.user.update({
                where: { id: receiverId },
                data: { points: { increment: amount } }
            })

            res.status(200).json({ message: "transfer point berhasil" })
        })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const userPoints = async (req: Request, res: Response, next: any) => {
    try {
        const userId = parseInt(req.params.id)
        const userPoints = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                points: true
            }
        })

        res.status(200).json({ userPoints })
    } catch (error) {
        next(error);
    }
}
