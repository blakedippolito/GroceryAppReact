import { useState } from "react";

const AddItem = ({ onAdd }) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const saved=false

  const onSubmit = (e) => {
    e.preventDefault();
    if (!item || !amount) {
      alert("Please enter a valid item");
      return;
    }
    onAdd({title: item, amount, saved });
    setItem("");
    setAmount("");
  };
  return (
    <form className="addForm" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Item"
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
        }}
      ></input>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
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
