import express from "express"
import { getOrder, createOrder, updateOrder, deleteOrder } from "../controllers/order-controller"

const router = express.Router()

router.get('/order', getOrder)
router.post('/order', createOrder)
router.put('/order/:id', updateOrder)
router.delete('/order/:id', deleteOrder)

export default router