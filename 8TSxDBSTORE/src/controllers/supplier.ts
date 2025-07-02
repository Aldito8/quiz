import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getSuppliers = async (req: Request, res: Response) => {
    try {
        const suppliers = await prisma.supplier.findMany()
        res.status(200).json(suppliers)
    } catch (error) {
        res.status(500).json("failed to fetch data")
    }
}

export const getSupplierProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        const products = await prisma.supplier.findMany({
            where: { id },
            include: {
                products: {
                    include: {
                        stock: true
                    }
                }
            }
        })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json("failed to fetch data!!")
    }
}

export const validateTransactionProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updates = req.body
        if (!Array.isArray(updates) || updates.length === 0) {
            throw { status: 400, message: "data tidak dapat diterima" }
        }

        for (const items of updates) {
            console.log(items)
            const { supplierId, productId, stock } = items;

            if (supplierId === undefined || productId === undefined || stock === undefined) {
                throw { status: 400, message: "supplierId, productId, dan stock diisi" }
            }

            if (typeof stock !== "number" || stock <= 0) {
                throw { status: 400, message: "stok tidak dapat diproses" }
            }

            const [supplier, product] = await Promise.all([
                prisma.supplier.findUnique({ where: { id: supplierId } }),
                prisma.product.findUnique({ where: { id: productId } }),
            ])

            if (!supplier) {
                throw { status: 404, message: "penyuplai tidak ditemukan" }
            }

            if (!product) {
                throw { status: 404, message: "produk tidak ditemukan" }
            }
        }

        next()

    } catch (error) {
        next(error)
    }
};


export const transactionProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {
        interface StockUpdate {
            supplierId: number
            productId: number
            stock: number
        }

        const updates: StockUpdate[] = req.body

        const batch = updates.map(item => {
            return prisma.stock.update({
                where: { productId: item.productId },
                data: {
                    quantity: { increment: item.stock }
                }
            })
        })

        await prisma.$transaction(batch)

        res.status(200).json({ message: "stok berhasil diperbaharui" })
    } catch (error) {
        next(error)
    }
};














// supplier => stock => product <= stock <= supplier

// supplier => product => stock
// supplier => product => stock

// supplier => product => stock
//          => push => product => supplier => product => stock