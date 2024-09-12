import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import AddItem from "./components/AddItem";
import Favorites from "./components/Favorites";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemsLeft, setItemsLeft] = useState(0);
  const [showAddItem, setShowAddItem] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:6969/api/list/');
        const data = await response.json();
        setItems(data.items);
        setItemsLeft(data.left);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const addItem = async (item) => {
    setItems([...items, item]);
  };

  const deleteItem = async (id) => {
    setItems(items.filter(item => item._id !== id));
    try {
      const response = await fetch("http://localhost:6969/api/list/deleteItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: id }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="App">
      <Header
        title={"Grocery App"}
        onAdd={() => setShowAddItem(!showAddItem)}
        showAdd={showAddItem}
      />
      {showAddItem && <AddItem onAdd={addItem} />}
      <Table items={items} onDelete={deleteItem} />
      <Favorites />
    </div>
  );
}

export default App;
