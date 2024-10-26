import { sql } from 'drizzle-orm';
import { db } from '../drizzle'; // Adjust the path if necessary

// SQL command to create the products table
const createProductsTableSQL = sql`
  CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    inventory_count INTEGER NOT NULL
  );
`;

// Function to create the products table
export const createProductsTable = async () => {
  try {
    await db.execute(createProductsTableSQL);
    console.log('Products table created successfully.');
  } catch (error) {
    console.error('Error creating products table:', error);
  }
};