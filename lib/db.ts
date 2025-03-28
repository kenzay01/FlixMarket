import { DataSource } from "typeorm";
import config from "../ormconfig";

export const AppDataSource =
  typeof window === "undefined" ? new DataSource(config) : null;

export const initializeDatabase = async () => {
  if (!AppDataSource) return;

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database connected successfully");
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
