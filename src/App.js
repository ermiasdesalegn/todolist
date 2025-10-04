import { useState } from "react";

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

  return (
    <>
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleMarked={handleMarked}
      />
      <Stats items={items} />
    </>
  );
}
function Logo() {
  return <h1>🌴Far Away 💼</h1>;
}
function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    // console.log(items);
    handleAddItems(newItem);
    setQuantity(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, handleDeleteItem, handleMarked }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            handleDeleteItem={handleDeleteItem}
            handleMarked={handleMarked}
          />
        ))}
      </ul>
      <div className="actions">
        <select>
          <option value="input">sort by input order </option>
          <option value="description">sort by description</option>n
          <option value="packed">sort by packed status</option>
        </select>
      </div>
    </div>
  );
}
function Item({ item, handleDeleteItem, handleMarked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => handleMarked(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
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
