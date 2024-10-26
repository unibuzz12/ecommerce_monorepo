// src/db/schema.ts
import { pgTable, varchar, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { decimal } from "drizzle-orm-pg";
// import { date } from 'drizzle-orm-pg';

export const products = pgTable("products", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  inventory_count: integer("inventory_count").notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  product_id: varchar("product_id", { length: 255 }).references(() => products.id).notNull(),
  order_count: integer("order_count").default(1).notNull(),
  created_date: timestamp("created_date").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
