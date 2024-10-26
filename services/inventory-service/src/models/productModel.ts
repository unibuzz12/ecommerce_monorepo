import { db } from "../db/drizzle";
import { products } from "../db/schema";
import { sql } from "drizzle-orm";

export interface Product {
  name: string;
  price: number;
  inventory_count: number;
}

export const createProduct = async (productData: Product) => {
  // Insert the product and return only the created product
  const result = await db.insert(products).values(productData).returning().execute();
  
  // Return the first product in the result array
  return result[0]; // Make sure to return the newly created product
};

export const getProductById = async (id: string) => {
  const product = await db
    .select()
    .from(products)
    .where(sql`${products.id} = ${id}`)
    .execute();
  return product[0];
};

export const fetchProducts = async () => {
  return db.select().from(products).execute();
};

export const updateProductInventory = async (id: string, product: Product) => {
  return db
    .update(products)
    .set({
      name: product.name,
      price: product.price,
      inventory_count: product.inventory_count,
    })
    .where(sql`${products.id} = ${id}`)
    .execute();
};

export const deleteProductInventory = async (id: string) => {
  return db
    .delete(products)
    .where(sql`${products.id} = ${id}`)
    .execute();
};
