import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// اگر DATABASE_URL وجود نداشت، خطای ساختاری نمی‌دهد تا بیلد ورسل بگذرد
export const pool = databaseUrl
  ? globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    })
  : null;

if (process.env.NODE_ENV !== "production" && pool) {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

// اگر pool وجود داشته باشد drizzle را می‌سازد، در غیر این صورت null یا یک Proxy خالی برمی‌گرداند
export const db = pool ? drizzle(pool) : ({} as ReturnType<typeof drizzle>);