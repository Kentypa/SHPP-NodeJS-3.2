export enum CRON_EXPRESSION {
  EVERY_SECOND = "* * * * * *",
  EVERY_4_HOURS = "0 */4 * * *",
  EVERY_DAY_AT_4_AM = "0 4 * * *",
  EVERY_MINUTE = "0/1 * * * *",
}
