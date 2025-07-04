import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { productSchema } from "../validation/product";
import { addProductService, updateProductService } from "../services/product";

export async function getProducts(req: Request, res: Response) {
    try {
        const products = await prisma.product.findMany()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function addProduct(req: Request, res: Response) {
    const user = (req as any).user
    try {
        if (!user || user.role != 'supplier') {
            res.status(404).json({ message: "user cannot add product" })
            return
        }

        const { error } = productSchema.validate(req.body)

        if (error) {
            res.status(400).json({ message: error })
            return
        }

        if (!req.file) {
            res.status(400).json({ message: "file not found" })
            return
        }

        const { name, stock, price } = req.body

        const pic = req.file.filename

        const product = await addProductService(name, stock, price, pic, user.id)

        res.status(200).json({ meesage: "succes add product", product })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const user = (req as any).user
        const id = parseInt(req.params.id)

        const p = await prisma.product.findMany({ where: { id } })

        if (user.id !== p[0].userid) {
            res.status(400).json({ message: "cannot update product" })
            return
        }

        const { error } = productSchema.validate(req.body)

        if (error) {
            res.status(400).json({ message: error })
            return
        }

        if (!req.file) {
            res.status(400).json({ message: "file not found" })
            return
        }

        const { name, stock, price } = req.body

        const pic = req.file.filename

        const product = await updateProductService(name, stock, price, pic, user.id, id)

        res.status(200).json({ meesage: "succes update product", product })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function updateImageProduct(req: Request, res: Response) {
    try {
        const user = (req as any).user
        const id = parseInt(req.params.id)

        const p = await prisma.product.findUnique({ where: { id } })

        if (user.id !== p?.userid) {
            res.status(400).json({ message: "cannot update product" })
            return
        }

        if (!req.file) {
            res.status(400).json({ message: "file not found" })
            return
        }

        const pic = req.file.filename

        await prisma.product.update({ where: { id }, data: { pic } })
        res.status(200).json({ message: "pic updated succesfully" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
