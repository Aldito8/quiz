import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { productSchema } from "../validation/product";


export async function addProduct(req: Request, res: Response) {
    const user = (req as any).user
    try {

        const { error } = productSchema.validate(req.body);

        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }
        const { name, description, price, stock } = req.body;
        console.log(user.role)
        if (!user || user.role !== "supplier") {
            res.status(403).json({ message: "Only suppliers can add products" });
            return
        }

        const userid = user.id;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                stock,
                price,
                userid
            },
        });

        res.status(201).json({
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        res.json({ message: error });
    }
}

export async function updateProduct(req: Request, res: Response) {
    const user = (req as any).user
    const id = parseInt(req.params.id);
    try {
        const { error } = productSchema.validate(req.body);

        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }
        const { name, description, price, stock } = req.body;
        const p = await prisma.product.findMany({ where: { id } })

        if (!user || user.role !== "supplier" || user.id != p[0].userid) {
            res.status(403).json({ message: "Only suppliers can update this product" });
            return
        }

        const product = await prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                description,
                price,
                stock,
            },
        });

        res.status(201).json({
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        res.json({ message: error });
    }
}

export async function getSupplierProduct(req: Request, res: Response) {
    const user = (req as any).user
    try {
        if (!user || user.role !== "supplier") {
            res.status(403).json({ message: "only supllier can access" });
            return
        }

        const products = await prisma.user.findMany({
            where: {
                id: user.id
            },
            include: {
                Product: true
            }
        })
        res.status(200).json(products)
    } catch (error) {
        res.json({ message: error });
    }

}

export async function deleteProduct(req: Request, res: Response) {
    const user = (req as any).user
    const id = parseInt(req.params.id);
    try {
        const p = await prisma.product.findUnique({ where: { id } })

        if (!p) {
            res.status(403).json({ message: "Product not Found" });
            return
        }

        if (!user || user.role !== "supplier" || user.id != p?.userid) {
            res.status(403).json({ message: "Only product owner can delete this product" });
            return
        }

        await prisma.product.delete({ where: { id } });

        res.status(201).json({ message: "Product deleted successfully", });
    } catch (error) {
        res.json({ message: error });
    }
}

export async function getProduct(req: Request, res: Response) {

    try {
        const user = (req as any).user

        console.log(user)
        if (!user) {
            res.status(403).json({ message: "login terlebih dahulu" });
            return
        }
        const products = await prisma.product.findMany()
        res.status(200).json(products)
    } catch (error) {
        res.json({ message: error });
    }
}