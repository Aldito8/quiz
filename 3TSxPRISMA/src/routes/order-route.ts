import express from "express";
import { createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/order-controller";


const orderrouter = express.Router()

orderrouter.get('/orders', getOrders)
orderrouter.post('/order', createOrder)
orderrouter.put('/order/:id', updateOrder)
orderrouter.delete('/order/:id', deleteOrder)

export default orderrouter