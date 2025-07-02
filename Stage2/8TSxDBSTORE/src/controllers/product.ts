import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                stock: true
            }
        })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json("failed to fetch data!!")
    }
}

