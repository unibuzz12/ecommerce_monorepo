import { Request, Response } from "express";
import {
  createProduct,
  getProductById,
  updateProductInventory,
  deleteProductInventory,
  fetchProducts,
} from "../models/productModel";

export const createInventory = async (req: Request, res: Response) => {
  try {
    const { name, price, inventory_count } = req.body;
    if (!name || !price || !inventory_count) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Create the product
    const newProduct = await createProduct({
      name,
      price,
      inventory_count,
    });
    res
      .status(201)
      .json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, inventory_count } = req.body;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Invalid product name" });
    }
    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({ message: "Invalid price" });
    }
    if (typeof inventory_count !== "number" || inventory_count < 0) {
      return res.status(400).json({ message: "Invalid inventory count" });
    }
    if( name !== product.name) return res.status(400).json({ message: "Same product already exists in database" });
    // Update the product's inventory and other details
    await updateProductInventory(id, {
      name,
      price,
      inventory_count,
    });

    return res.json({
        id,
        name,
        price,
        inventory_count,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteInventory = async (req: Request, res: Response) => {
  try {
    await deleteProductInventory(req.params.id);
    res.json({ message: "Inventory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const fetchInventory = async (_: Request, res: Response) => {
  try {
    const products = await fetchProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
