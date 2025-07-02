import { Router } from "express";
import { getOrders, ordersSummary } from "../controllers/order-controller";

const router = Router()

router.get("/orders", getOrders)
router.get("/orders/summary", ordersSummary)

export default router