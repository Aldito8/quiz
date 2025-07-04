import express from 'express';
import { addProduct, getProducts, updateImageProduct, updateProduct } from '../controllers/product';
import { authenticate } from '../middlewares/auth';
import { upload } from '../utils/multer';

const router = express.Router()

router.get('/products', getProducts)
router.post('/products/add', authenticate, upload.single('pic'), addProduct)
router.put('/products/update/:id', authenticate, upload.single('pic'), updateProduct)
router.patch('/products/upload-image/:id', authenticate, upload.single('pic'), updateImageProduct)

export default router