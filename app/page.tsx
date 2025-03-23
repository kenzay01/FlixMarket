"use client";
import { useClientTranslation } from "./hooks/useTranslate";
export default function Home() {
  console.log(useClientTranslation("welcome"));
  return <div>Home</div>;
}
