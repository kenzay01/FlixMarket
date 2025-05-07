import { AppDataSource } from "./lib/db";

async function runMigrations() {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  console.log("Migrations completed successfully");
  await AppDataSource.destroy();
}

runMigrations().catch((error) =>
  console.error("Error running migrations:", error)
);
        