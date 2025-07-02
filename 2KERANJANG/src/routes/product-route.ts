import express from "express"
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product-controller"

const router = express.Router()

router.get('/product', getProduct)
router.post('/product', createProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

export default router