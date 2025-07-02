import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getComments = async (req: Request, res: Response) => {
    try {
        const comments = await prisma.comment.findMany()
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ message: "failed to fetch data" })
    }
}