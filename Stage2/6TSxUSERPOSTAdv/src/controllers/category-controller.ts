import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getCategories = (req: Request, res: Response) => {
    try {
        const categories = prisma.category.findMany()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: "failed to fetch data" })
    }
}