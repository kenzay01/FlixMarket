"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
<<<<<<< HEAD

export default function NotFound() {
  const router = useRouter();
=======
// import { useClientTranslation } from "@/app/hooks/useTranslate";

export default function NotFound() {
  const router = useRouter();
  //   const locale = router.local as string;
>>>>>>> 94a1d3490881610771c584fa46bfc6e5b3f0e033

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <button
          onClick={() => router.push("/en")}
          className="mt-4 flex items-center gap-2 mx-auto px-6 py-2 bg-indigo-600 text-white rounded-3xl cursor-pointer hover:bg-indigo-700 transition"
        >
          <FaArrowLeft /> Return back
        </button>
      </div>
    </div>
  );
}
