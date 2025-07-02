import { Request, Response } from "express";
import { products, Product, getNextProductId } from '../models/product-model';

export const getProduct = (req: Request, res: Response) => {
    res.json(products)
}

export const createProduct = (req: Request, res: Response) => {
    const { name, description, price } = req.body

    const newProduct: Product = {
        id: getNextProductId(),
        name,
        description,
        price
    }

    products.push(newProduct)

    res.status(200).json(products)
}

export const updateProduct = (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { name, description, price } = req.body

    const index = products.findIndex(item => item.id == id)

    if (index !== -1) {
        console.log(products[index])
        products[index] = {
            ...products[index],
            name,
            description,
            price
        }
        res.status(200).json(products)
    } else {
        res.status(404).json('Item not found')
    }
}

export const deleteProduct = (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    const index = products.findIndex(item => item.id === id);

    if (index !== -1) {
        products.splice(index, 1)
        res.status(204).send()
    } else {
        res.status(404).json('Item not found')
    }
}
