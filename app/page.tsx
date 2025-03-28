"use client";
import { useAppContext } from "@/context/AppContext";
export default function Home() {
  const { isLoading } = useAppContext();
  console.log("isLoading", isLoading);
  return <div>Home</div>;
}
