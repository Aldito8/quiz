import express from "express"
import { createPosts, deletePosts, getPosts } from "../controllers/post-controller"

const router = express.Router()

router.get('/posts', getPosts)
router.post('/posts', createPosts)
router.delete('/posts/:id', deletePosts)

export default router