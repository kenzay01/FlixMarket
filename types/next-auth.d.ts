import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Розширення типу User для включення додаткових полів
   */
  interface User {
    role?: string;
  }

  /**
   * Розширення типу Session для включення додаткових полів в user
   */
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}
