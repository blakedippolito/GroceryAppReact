import { useState, useEffect } from "react";

const AddItem = ({ onAdd }) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const saved=false

  const addItem = async () => {
    try {
      const response = await fetch("http://localhost:6969/api/list/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: item, itemAmount: amount, saved }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
    
  const onSubmit = (e) => {
    e.preventDefault();
    if (!item || !amount) {
      alert("Please enter a valid item");
      return;
    }
    onAdd({title: item, amount, saved });
    addItem();
    setItem("");
    setAmount("");
  };
  return (
    <form className="addForm" onSubmit={onSubmit} method='POST'>
      <input
        type="text"
        placeholder="Item"
        value={item}
        name="itemName"
        onChange={(e) => {
          setItem(e.target.value);
        }}
      ></input>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        name="itemAmount"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
        style={{ width: '100px'}}
      ></input>
      <input type="submit" value="Submit"></input>
    </form>
  );
};

export default AddItem;
