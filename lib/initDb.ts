import { initializeDatabase } from "./db";

export const serverInitDatabase = async () => {
  if (typeof window !== "undefined") return false; // Вихід, якщо це клієнт
  await initializeDatabase();
  return true;
};
