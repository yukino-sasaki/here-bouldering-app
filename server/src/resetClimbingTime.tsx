import cron from "node-cron";

cron.schedule("0 0 0 * * *", () => console.log("24時に実行"));
