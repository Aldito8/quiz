import { Router } from "express";
import { getPost, getPostComment, getPostCommentsSummary } from "../controllers/post-controller";


const router = Router()

router.get('/posts', getPost)
router.get('/post/:id/comments', getPostComment)
router.get('/post/comments-summary', getPostCommentsSummary)

export default router