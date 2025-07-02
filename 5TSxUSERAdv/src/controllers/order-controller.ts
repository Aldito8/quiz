import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany()
        res.json({ data: orders })
    } catch (error) {
        res.status(500).json({ message: "failed to fetch data" })
    }
}

export const ordersSummary = async (req: Request, res: Response) => {

    const {
        limit,
        offset
    } = req.query

    try {
        const orders = await prisma.order.groupBy({
            by: ['userId'],
            _sum: {
                quantity: true,
            },
            orderBy: {
                userId: 'asc'
            },
            skip: Number(offset),
            take: Number(limit)
        })
        const total = orders.length
        res.json({ data: orders, total })
    } catch (error) {
        res.status(500).json({ message: `${error}` })
    }
}
