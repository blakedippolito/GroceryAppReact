import { useState } from "react";

const AddItem = ({ onAdd }) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const saved = false;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!item || !amount) {
      alert("Please enter a valid item");
      return;
    }

    // Create new item object with backend-compatible property names
    const newItem = { item: item, amount: amount, saved };

    try {
      // Add item to the UI, but map the backend names to UI names here
      onAdd({ item: item, amount, saved });

      // Send the item to the server
      const response = await fetch("http://localhost:6969/api/list/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const data = await response.json();
      console.log("Item added to server:", data);
    } catch (error) {
      console.error("Error adding item:", error);
    }

    // Clear input fields
    setItem("");
    setAmount("");
  };

  return (
    <form className="addForm" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Item"
        value={item}
        name="item"
        onChange={(e) => setItem(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        name="amount"
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '100px' }}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default AddItem;
