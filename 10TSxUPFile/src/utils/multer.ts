import path from "path";
import multer, { FileFilterCallback } from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req: any, file: any, cb: FileFilterCallback) => {
    if (!file.originalname || typeof file.originalname !== 'string') {
        return cb(new Error('Invalid or missing file name'));
    }

    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    const allowedExtensions = ['jpg', 'png', 'jpeg'];
    if (allowedExtensions.includes(ext)) {
        cb(null, true)
    } else {
        cb(new Error('only jpg, png, jpeg allowed to upload'))
    }
}

export const upload = multer({
    storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024
    }
})