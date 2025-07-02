import express from "express";
import { createProduct, deleteProduct, getProducts, getSpesificProduct, updateProduct } from "../controllers/product-controller";

const productrouter = express.Router()

productrouter.get('/product/:id', getSpesificProduct)
productrouter.get('/products', getProducts)
productrouter.post('/product', createProduct)
productrouter.put('/product/:id', updateProduct)
productrouter.delete('/product/:id', deleteProduct)

export default productrouter