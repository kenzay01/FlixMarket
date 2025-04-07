"use client";
import { useAppContext } from "@/context/AppContext";
export default function Home() {
  const { isLoading } = useAppContext();
  console.log("isLoading", isLoading);
  return (
    <section className="w-full h-screen max-h-screen relative overflow-hidden bg-gradient-to-r from-indigo-500 to-indigo-500 flex items-center justify-center text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-16"></div>
    </section>
  );
}
