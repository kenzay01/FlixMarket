"use client";
import { useClientTranslation } from "../hooks/useTranslate";
import HomeBanner from "./components/homeBanner";
import PopularItems from "./components/popularItems";
export default function Home() {
  console.log(useClientTranslation("welcome"));
  return (
    <div className="h-full w-full">
      <HomeBanner />
      {/* <div className="h-screen w-full"></div> */}
      <PopularItems />
    </div>
  );
}
