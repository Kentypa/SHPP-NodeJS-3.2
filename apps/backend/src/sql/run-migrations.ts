import fs from "fs";
import path from "path";
import { pool } from "../config/db.config";

const MIGRATIONS_DIR = path.resolve(__dirname, "migrations");

export const runMigrations = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const files = fs
      .readdirSync(MIGRATIONS_DIR)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
      await client.query(sql);
      console.log(`Applied migration: ${file}`);
    }

    await client.query("COMMIT");
    console.log("All migrations completed");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Migration failed", error);
    throw error;
  } finally {
    client.release();
  }
};
