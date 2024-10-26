import { Router } from "express";
import {
  createInventory,
  updateInventory,
  deleteInventory,
  fetchInventory,
} from "../controllers/inventoryController";

const router = Router();
router.post("/", createInventory);
router.get("/", fetchInventory);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);

export default router;
