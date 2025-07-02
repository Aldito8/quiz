import express from "express";
import { addProduct, deleteProduct, getProduct, getSupplierProduct, updateProduct } from "../controllers/product";
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/get', authenticate, getProduct)
router.get('/supplier', authenticate, getSupplierProduct)
router.post('/supplier/add', authenticate, addProduct)
router.put('/supplier/update/:id', authenticate, updateProduct)
router.delete('/supplier/delete/:id', authenticate, deleteProduct)

export default router;