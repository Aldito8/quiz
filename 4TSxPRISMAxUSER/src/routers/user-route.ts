import express from "express";
import { getUser, createUser, updateUser, deleteUser, getUserById } from '../controllers/user-controllers'

const router = express.Router()

router.get("/user/:id", getUserById)
router.get("/user", getUser)
router.post("/user", createUser)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)

export default router