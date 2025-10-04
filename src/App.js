import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "charger", quantity: 12, packed: false },
// ];
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleMarked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleRemove() {
    const confirmed = window.confirm(
      "are you sure you want to delete everything here?"
    );
    if (confirmed) setItems([]);
  }
  return (
    <>
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleMarked={handleMarked}
        handleRemove={handleRemove}
      />
      <Stats items={items} />
    </>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p>
        <em className="stats">
          {" "}
          Start adding items to the packing list for further notice{" "}
        </em>
      </p>
    );

  const num = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const numPercentage = num === 0 ? 0 : Math.round((numPacked / num) * 100);
  return (
    <footer className="stats">
      <em>
        {numPercentage === 100
          ? "You got everything you can go as fast as you can while you are free✈️"
          : `💼You have ${num} items on your list and you have already packed${numPacked}  (${numPercentage})
        `}
      </em>
    </footer>
  );
}
