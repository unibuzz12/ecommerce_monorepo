import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export const databaseUrl = process.env.DATABASE_URL;
export const PORT = process.env.PORT || 4000;