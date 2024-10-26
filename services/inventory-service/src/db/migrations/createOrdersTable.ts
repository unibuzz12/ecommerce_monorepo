import { sql } from 'drizzle-orm';
import { db } from '../drizzle'; // Adjust the path if necessary

// SQL command to create the products table
const createOrdersTableSQL = sql`
  CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id VARCHAR(255) NOT NULL,
    order_count INTEGER NOT NULL,
    created_date VARCHAR(255) NOT NULL
  );
`;

export const createOrdersTable = async () => {
  try {
    await db.execute(createOrdersTableSQL);
    console.log('Orders table created successfully.');
  } catch (error) {
    console.error('Error ordering products table:', error);
  }
};