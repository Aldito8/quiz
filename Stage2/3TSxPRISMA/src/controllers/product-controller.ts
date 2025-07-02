import { prisma } from "../connection/client";
import { Request, Response } from "express";

export const getSpesificProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json("Failed to fetch data")
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.findMany()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json("Failed to fetch data")
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price } = req.body
        const product = await prisma.product.create({
            data: { name, price: parseFloat(price) }
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json("Failed to create product")
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    try {
        const { name, price } = req.body
        const product = await prisma.product.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                price: price
            }
        })

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json("Failed to update product")
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    console.log(id)
    try {
        await prisma.product.delete({
            where: {
                id: id
            }
        })
        res.status(202).json(`Successfully deleted data by id: ${id}`)
    } catch (error) {
        res.status(500).json("Failed to delete product")
    }
}