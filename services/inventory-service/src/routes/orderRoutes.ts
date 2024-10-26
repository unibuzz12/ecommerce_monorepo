import { Router } from "express";
import { createNewOrder, fetchAllOrders } from "../controllers/orderController";

const router = Router();
router.post("/", createNewOrder);
router.get("/", fetchAllOrders);

export default router;
