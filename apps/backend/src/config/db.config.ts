import { Pool, PoolConfig } from "pg";
import path from "path";

const projectRoot = path.resolve(__dirname, "../..");
export const UPLOADS_DIR = path.join(projectRoot, "uploads");

export interface DatabaseConfig extends PoolConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  user: process.env.DB_USERNAME || "kentadmin",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "kentdb",
};

export const pool = new Pool(dbConfig);

export default dbConfig;
