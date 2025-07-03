import dotenv from "dotenv";
import app from "./app";
import { databaseManager } from "./shared/utils/database";
import { startCleanupScheduler } from "./services/cleanupScheduler.service";
import { startBackupScheduler } from "./services/backupScheduler.service";

dotenv.config();

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log("Starting server initialization...");

    console.log("Testing database connection...");
    await databaseManager.testConnection();

    console.log("Running database migrations...");
    await databaseManager.runMigrations();

    console.log("Running database seeds...");
    await databaseManager.runSeeds();

    await app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Server URL: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    try {
      await databaseManager.close();
    } catch (closeError) {
      console.error("Error closing database:", closeError);
    }
    process.exit(1);
  }
}

startServer();
startCleanupScheduler();
startBackupScheduler();

process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  try {
    await databaseManager.close();
    console.log("Server shutdown completed");
  } catch (error) {
    console.error("Error during shutdown:", error);
  }
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\nReceived SIGTERM, shutting down gracefully...");
  try {
    await databaseManager.close();
    console.log("Server shutdown completed");
  } catch (error) {
    console.error("Error during shutdown:", error);
  }
  process.exit(0);
});
