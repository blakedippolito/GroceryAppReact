import { useState } from "react";

const AddItem = ({ onAdd }) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [saved, setSaved] = useState(false)
  const [completed, setCompleted] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!item || !amount) {
      alert("Please enter a valid item");
      return;
    }


      // Add item to the UI, but map the backend names to UI names here
    onAdd({ item, amount, saved, completed });

    // Clear input fields
    setItem("");
    setAmount("");
    setSaved(false)
    setCompleted(false)
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
