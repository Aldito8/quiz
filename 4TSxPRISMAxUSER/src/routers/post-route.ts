import express from "express";
import { getPost, createPost, updatePost, deletePost } from '../controllers/post-controller'

const router = express.Router()

router.get("/post", getPost)
router.post("/post", createPost)
router.put("/post/:id", updatePost)
router.delete("/post/:id", deletePost)

export default router