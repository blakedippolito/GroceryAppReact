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
    <form className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg max-h-96 overflow-y-auto fixed top-[150px] left-1/2 transform -translate-x-1/2" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Item"
        value={item}
        name="item"
        onChange={(e) => setItem(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full text-center"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        name="amount"
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-24"
      />
      <input
        type="submit"
        value="Submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer text-center"
      />
    </form>
  );
  
};

export default AddItem;
