import { drizzle } from "drizzle-orm/mysql2";

if(!process.env.DATABASE_URL){
    throw new Error("DATABASE URL IS REQUIRED")
}

export const db = drizzle(process.env.DATABASE_URL);