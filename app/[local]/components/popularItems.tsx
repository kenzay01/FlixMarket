import PopularItem from "./popularItem";
import type { Subscription } from "../../../types/subscriptions";
export default function PopularItems() {
  const listOfItems: Subscription[] = [
    {
      id: "1",
      title: "Item 1",
      description: "Description 1",
      price: 100,
      image: "https://via.placeholder.com/150",
      benefitsList: ["Benefit 1", "Benefit 2", "Benefit 3"],
    },
    {
      id: "2",
      title: "Item 2",
      description: "Description 2",
      price: 100,
      image: "https://via.placeholder.com/150",
      benefitsList: ["Benefit 1", "Benefit 2", "Benefit 3"],
    },
    {
      id: "3",
      title: "Item 3",
      description: "Description 3",
      price: 100,
      image: "https://via.placeholder.com/150",
      benefitsList: ["Benefit 1", "Benefit 2", "Benefit 3"],
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto p-6 pt-24 overflow-x-hidden">
      <h2 className="w-full text-center text-4xl font-bold mb-8">
        Popular Items
      </h2>
      <div>
        {listOfItems.map((item, index) => (
          <PopularItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
