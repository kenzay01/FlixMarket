import { title } from "process";

export default function PopularItems() {
  const listOfItems = [
    { title: "Item 1", description: "Description 1", price: 100 },
    { title: "Item 2", description: "Description 2", price: 100 },
    { title: "Item 3", description: "Description 3", price: 100 },
  ];
  return (
    <section className="width-full h-auto max-w-4xl mx-auto p-6 pt-24">
      <h2 className="w-full text-center text-4xl font-bold">Popular Items</h2>
      <div>
        {listOfItems.map((item, index) => (
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
