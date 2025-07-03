import * as cron from "node-cron";
import fs from "fs/promises";
import path from "path";
import { pool } from "../config/db.config";
import { CRON_EXPRESSION } from "../shared/enum/cron-expression.enum";

export const cleanupDeletedBooks = async () => {
  console.log(
    "Starting cleanup of deleted books (immediate deletion for testing)..."
  );

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const getDeletedBooksQuery = `
      SELECT id, image FROM book 
      WHERE deleted_at IS NOT NULL`;

    const deletedBooks = await client.query(getDeletedBooksQuery);

    if (deletedBooks.rows.length === 0) {
      console.log("No books to cleanup");
      await client.query("COMMIT");
      return;
    }

    console.log(`Found ${deletedBooks.rows.length} books to cleanup`);

    for (const book of deletedBooks.rows) {
      if (book.image) {
        try {
          const imagePath = path.join(
            __dirname,
            "..",
            "..",
            "uploads",
            path.basename(book.image)
          );

          await fs.unlink(imagePath);
          console.log(`Successfully deleted image: ${book.image}`);
        } catch (fileError) {
          if (fileError.code === "ENOENT") {
            console.log(
              `Image file not found (already deleted): ${book.image}`
            );
          } else {
            console.warn(
              `Warning: Could not delete image ${book.image}:`,
              fileError.message
            );
          }
        }
      }
    }

    const getAuthorsQuery = `
      SELECT DISTINCT a.id FROM author a
      JOIN book_authors ba ON a.id = ba.author_id
      WHERE ba.book_id IN (
        SELECT id FROM book 
        WHERE deleted_at IS NOT NULL
      )`;

    const authorsResult = await client.query(getAuthorsQuery);

    const deleteQuery = `
      DELETE FROM book 
      WHERE deleted_at IS NOT NULL`;

    const deleteResult = await client.query(deleteQuery);

    for (const author of authorsResult.rows) {
      const authorBookCountQuery = `
        SELECT COUNT(*) FROM book_authors WHERE author_id = $1`;
      const countResult = await client.query(authorBookCountQuery, [author.id]);

      if (parseInt(countResult.rows[0].count) === 0) {
        await client.query("DELETE FROM author WHERE id = $1", [author.id]);
        console.log(`Deleted orphaned author with ID: ${author.id}`);
      }
    }

    await client.query("COMMIT");
    console.log(`Successfully cleaned up ${deleteResult.rowCount} books`);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error during cleanup:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const startCleanupScheduler = () => {
  cron.schedule(CRON_EXPRESSION.EVERY_4_HOURS, async () => {
    console.log("Running scheduled cleanup task...");
    try {
      await cleanupDeletedBooks();
    } catch (error) {
      console.error("Scheduled cleanup failed:", error);
    }
  });

  console.log("Cleanup scheduler started - running every 4 hours");
};
