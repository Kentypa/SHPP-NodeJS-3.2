import { Pool } from "pg";
import { pool } from "../../config/db.config";
import fs from "fs/promises";
import path from "path";

export class DatabaseManager {
  private pool: Pool;

  constructor(poolInstance: Pool) {
    this.pool = poolInstance;
  }

  async testConnection(): Promise<void> {
    try {
      const client = await this.pool.connect();
      await client.query("SELECT NOW()");
      client.release();
      console.log("Database connection successful");
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  }

  async ensureDirectoriesExist(): Promise<void> {
    const migrationsDir = path.join(__dirname, "../../sql/migrations");
    const seedsDir = path.join(__dirname, "../../sql/seeds");

    try {
      await fs.access(migrationsDir);
    } catch {
      console.log("Creating migrations directory...");
      await fs.mkdir(migrationsDir, { recursive: true });
    }

    try {
      await fs.access(seedsDir);
    } catch {
      console.log("Creating seeds directory...");
      await fs.mkdir(seedsDir, { recursive: true });
    }
  }

  async runMigrations(): Promise<void> {
    try {
      console.log("Starting migrations...");

      await this.ensureDirectoriesExist();

      const migrationsDir = path.join(__dirname, "../../sql/migrations");

      let files: string[];
      try {
        files = await fs.readdir(migrationsDir);
      } catch (error) {
        console.log("No migrations directory found, skipping migrations");
        return;
      }

      const sqlFiles = files.filter((file) => file.endsWith(".sql")).sort();

      if (sqlFiles.length === 0) {
        console.log("No migration files found");
        return;
      }

      console.log(`Found ${sqlFiles.length} migration file(s):`, sqlFiles);

      for (const file of sqlFiles) {
        const filePath = path.join(migrationsDir, file);

        try {
          const sql = await fs.readFile(filePath, "utf-8");

          if (sql.trim().length === 0) {
            console.log(`Skipping empty migration: ${file}`);
            continue;
          }

          console.log(`Running migration: ${file}`);
          await this.pool.query(sql);
          console.log(`Migration completed: ${file}`);
        } catch (fileError) {
          console.error(`Error in migration ${file}:`, fileError);
          throw fileError;
        }
      }

      console.log("All migrations completed successfully");
    } catch (error) {
      console.error("Migration error:", error);
      throw error;
    }
  }

  async runSeeds(): Promise<void> {
    try {
      console.log("Starting seeds...");

      await this.ensureDirectoriesExist();

      const seedsDir = path.join(__dirname, "../../sql/seeds");

      let files: string[];
      try {
        files = await fs.readdir(seedsDir);
      } catch (error) {
        console.log("No seeds directory found, skipping seeds");
        return;
      }

      const sqlFiles = files.filter((file) => file.endsWith(".sql")).sort();

      if (sqlFiles.length === 0) {
        console.log("No seed files found");
        return;
      }

      console.log(`Found ${sqlFiles.length} seed file(s):`, sqlFiles);

      for (const file of sqlFiles) {
        const filePath = path.join(seedsDir, file);

        try {
          const sql = await fs.readFile(filePath, "utf-8");

          if (sql.trim().length === 0) {
            console.log(`Skipping empty seed: ${file}`);
            continue;
          }

          console.log(`Running seed: ${file}`);
          await this.pool.query(sql);
          console.log(`Seed completed: ${file}`);
        } catch (fileError) {
          console.error(`Error in seed ${file}:`, fileError);
          console.log(`Continuing with next seed...`);
        }
      }

      console.log("All seeds completed");
    } catch (error) {
      console.error("Seed error:", error);
      console.log("Continuing server startup despite seed errors...");
    }
  }

  async close(): Promise<void> {
    try {
      await this.pool.end();
      console.log("Database connection closed");
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
  }
}

export const databaseManager = new DatabaseManager(pool);
