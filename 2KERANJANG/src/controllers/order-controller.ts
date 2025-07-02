import { Request, Response } from "express";
import { orders, Order, getNextOrderId } from "../models/order-model";
import { products } from '../models/product-model';

export const getOrder = (req: Request, res: Response) => {
    const mergeDataOrderProduct = orders.map(o => {
        const product = products.find(p => p.id === o.productId)
        return {
            ...o,
            products: product
        }
    })

    res.json(mergeDataOrderProduct)
}

export const createOrder = (req: Request, res: Response) => {
    const { productId, quantity } = req.body
    const product = products.find(p => p.id == productId)

    if (product) {
        const newOrder: Order = {
            id: getNextOrderId(),
            productId,
            quantity
        }
        orders.push(newOrder)
        res.status(200).json(orders)
    } else {
        res.status(404).json("Item not found")
    }
}

export const updateOrder = (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    const { productId, quantity } = req.body

    const index = orders.findIndex(item => item.id == id)
    const product = products.find(p => p.id == productId)

    console.log(orders[index])

    if (index !== -1 && product) {
        orders[index] = {
            ...orders[index],
            productId,
            quantity
        }
        res.status(200).json(orders)
    } else {
        res.status(404).json('Item not found')
    }
}

export const deleteOrder = (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const index = orders.findIndex(item => item.id === id);
    if (index !== -1) {
        orders.splice(index, 1)
        res.status(204).send()
    } else {
        res.status(404).json('Item not found')
    }
}