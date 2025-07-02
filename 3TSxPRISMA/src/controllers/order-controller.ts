import { prisma } from "../connection/client";
import { Request, Response } from "express";

export const getOrders = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.findMany()
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json("Failed to fetch data")
    }
}

export const createOrder = async (req: Request, res: Response) => {
    const { productId, quantity } = req.body

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        if (product) {
            const order = await prisma.order.create({
                data: { productId, quantity }
            })

            res.status(201).json(order)
        } else {
            res.status(404).json("Product Id not found")
        }
    } catch (error) {
        res.status(500).json("Failed to create order")
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { productId, quantity } = req.body

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if (product) {
            const order = await prisma.order.update({
                where: {
                    id: id,
                },
                data: {
                    productId: productId,
                    quantity: quantity
                }
            })
            res.status(200).json(order)
        } else {
            res.status(404).json("Product Id not found")
        }

    } catch (error) {
        res.status(500).json("Failed to update order")
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        await prisma.order.delete({
            where: {
                id: id
            }
        })
        res.status(202).json(`Successfully deleted data by id: ${id}`)
    } catch (error) {
        res.status(404).json("Data not found")
    }
}