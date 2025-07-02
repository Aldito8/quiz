import express from 'express';
import { getSupplierProduct, getSuppliers, transactionProduct, validateTransactionProduct } from '../controllers/supplier';


const router = express.Router()

router.get('/suppliers', getSuppliers)
router.get('/suppliers/:id', getSupplierProduct)
router.post('/suppliers/stock', validateTransactionProduct, transactionProduct)

export default router