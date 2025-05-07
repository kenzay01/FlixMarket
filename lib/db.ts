import { DataSource } from "typeorm";
// import { AddInvoiceIdToSubscriptionPayment1744200331629 } from "./migrations/1744200331629-AddInvoiceIdToSubscriptionPayment";
import config from "../ormconfig";
import { AddCzechLanguageAndCZKPrices1744200331630 } from "../migrations/1744200331630-AddCzechLanguageAndCZKPrices";
import { AddPolandLanguageAndPlnPrices1745200331630 } from "../migrations/1745200331630-AddPolandLanguageAndPlnPrices";

export const AppDataSource =
  typeof window === "undefined"
    ? new DataSource({
        ...config,
        migrations: [
          AddCzechLanguageAndCZKPrices1744200331630,
          AddPolandLanguageAndPlnPrices1745200331630,
        ], // Додано шлях до міграцій
        migrationsTableName: "migrations",
      })
    : null;

export const initializeDatabase = async () => {
  if (!AppDataSource) return;

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      // console.log("Database connected successfully");
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
