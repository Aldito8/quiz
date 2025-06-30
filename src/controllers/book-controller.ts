import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await prisma.book.findMany()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: "failed to fetch data" })
    }
}