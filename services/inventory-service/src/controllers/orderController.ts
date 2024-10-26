import { Request, Response } from "express";
import { createOrder, fetchOrders } from "../models/orderModel";
import { getProductById, updateProductInventory } from "../models/productModel";

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.body;
    if (!product_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the product
    let product = await getProductById(product_id);
    if (product.inventory_count <= 0) {
      return res.status(402).json({ message: "Can't buy item" });
    }

    await createOrder(product_id);

    await updateProductInventory(product.id, {
      name: product.name,
      price: product.price,
      inventory_count: product.inventory_count - 1,
    });

    return res.status(201).json({
      message: "order created successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const fetchAllOrders = async (_: Request, res: Response) => {
  try {
    const orders = await fetchOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
