import { exec } from "child_process";
import { CRON_EXPRESSION } from "../shared/enum/cron-expression.enum";
import * as cron from "node-cron";
import path from "path";
import dbConfig from "../config/db.config";

export const backupDatabase = async () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(__dirname, "..", "..", "backups");
  const backupFile = `backup-${timestamp}.sql`;
  const backupPath = path.join(backupDir, backupFile);

  const command = `PGPASSWORD=${dbConfig.password} pg_dump -h ${dbConfig.host} -p ${dbConfig.port} -U ${dbConfig.user} -F c -b -v -f "${backupPath}" ${dbConfig.database}`;

  console.log(`Starting backup: ${backupPath}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Backup error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Backup stderr: ${stderr}`);
      return;
    }
    console.log(`Backup completed: ${stdout}`);
  });
};

export const startBackupScheduler = () => {
  cron.schedule(CRON_EXPRESSION.EVERY_DAY_AT_4_AM, async () => {
    console.log("Running scheduled database backup...");
    await backupDatabase();
  });

  console.log("Backup scheduler started - running every day");
};
