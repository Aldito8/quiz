import express from 'express';
import { handleLogin, handleRegister } from '../controllers/auth';
import { authenticate, multerError } from '../middlewares/auth';
import limiter from '../middlewares/rate-limiter';
import { upload } from '../utils/multer';
import { uploadFile } from '../controllers/upload';


const router = express.Router()

router.post('/register', limiter, upload.single('profile'), multerError, handleRegister)
router.post('/login', limiter, handleLogin)
router.post('/upload-profile-picture', limiter, authenticate, upload.single('profile'), multerError, uploadFile)

router.get('/me', limiter, authenticate, (req, res) => {
    res.json({ message: "Protected Route" })
})

export default router