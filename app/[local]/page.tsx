"use client";
import { useClientTranslation } from "../hooks/useTranslate";
import HomeBanner from "./components/homeBanner";
import PopularItems from "./components/popularItems";
import HowItWorks from "./components/howItWorks";
export default function Home() {
  console.log(useClientTranslation("welcome"));
  return (
    <div className="h-full w-full">
      <HomeBanner />
      <PopularItems />
      <HowItWorks />
    </div>
  );
}
