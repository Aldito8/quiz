import { Router } from "express";
import { getComments } from "../controllers/comment-controller";

const router = Router()

router.get('/comments', getComments)

export default router