import { db } from "../db/drizzle";
import { orders, products } from "../db/schema";
import { sql } from "drizzle-orm";

export const createOrder = async (productId: string) => {
  const [product] = await db
    .select()
    .from(products)
    .where(sql`${products.id} = ${productId} AND ${products.inventory_count} > 0`);

  if (!product) throw new Error("Product not available or out of stock");

  const [existingOrder] = await db.select().from(orders).where(sql`${orders.product_id} = ${productId}`);

  if (existingOrder) {
    await db
      .update(orders)
      .set({ order_count: sql`${existingOrder.order_count} + 1` })
      .where(sql`${orders.product_id} = ${productId}`)
      .execute();
  } else {
    await db
      .insert(orders)
      .values({ product_id: productId, order_count: 1, created_date: new Date() })
      .execute();
  }
};

export const fetchOrders = async () => {
  return db
    .select({
      id: orders.id,
      product_id: orders.product_id,
      name: products.name,
      price: products.price,
      count: orders.order_count,
      created_date: orders.created_date,
    })
    .from(orders)
    .innerJoin(products, sql`${orders.product_id}::uuid = ${products.id}::uuid`)
    .execute();
};
