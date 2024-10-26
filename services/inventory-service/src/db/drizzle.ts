import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { databaseUrl } from "../config/dotenv";

const client = postgres(databaseUrl);
export const db = drizzle(client);
