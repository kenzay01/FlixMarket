import { useClientTranslation } from "@/app/hooks/useTranslate";
import { motion } from "framer-motion";
export default function HowItWorks() {
  const steps = [
    "Sign up for an account",
    "Add your first item",
    "step 3",
    "step 4",
    "step 5",
  ];
  const stepTitle = useClientTranslation("step");
  const btnTitle = useClientTranslation("try_now");
  const mainTitle = useClientTranslation("how_it_works");
  return (
    <section
      className="w-full mx-auto flex bg-gray-100 items-center justify-center pt-24 overflow-x-hidden"
      id="how-it-works"
    >
      <div className="max-w-5xl flex flex-col md:flex-row w-full p-6 gap-6">
        <motion.div
          className="flex-6"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="w-full h-32 bg-amber-950"></div>
        </motion.div>
        <motion.div
          className="p-6 flex-5"
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1 className="text-4xl">{mainTitle}</h1>
          <p className="p-2 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            aperiam ipsum commodi non, nam maiores libero molestiae doloremque
            fugiat cupiditate minus placeat culpa quae similique? Ut
            necessitatibus qui deserunt ab!
          </p>
          <div>
            {steps.map((step, index) => {
              return (
                <div key={index} className="flex gap-4 items-start my-8">
                  <div className="w-16 h-16 bg-indigo-300 text-indigo-600 rounded-full flex items-center justify-center text-2xl">
                    {index + 1}
                  </div>
                  <div className="p-2 ">
                    <h2 className="text-2xl font-bold mb-2">
                      {stepTitle} {index + 1}
                    </h2>
                    <p className="text-gray-600">{step}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="mt-4 px-6 py-2 bg-indigo-600 border-2 border-indigo-600 text-white text-lg rounded-3xl hover:bg-transparent transition hover:text-indigo-600 cursor-pointer">
            {btnTitle}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
