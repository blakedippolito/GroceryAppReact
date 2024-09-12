import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import AddItem from "./components/AddItem";
import Favorites from "./components/Favorites";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  // const items = [
  //   {
  //     id: 1,
  //     title: "Apples",
  //     amount: 10,
  //     saved: true
  //   },
  //   {
  //     id: 2,
  //     title: "Bananas",
  //     amount: 6,
  //     saved: false
  //   },
  // ];
  const [items, setItems] = useState([]);
  const [itemsLeft, setItemsLeft] = useState(0);
  const [loading, setLoading] = useState(true); // Optional: to show a loading state
  const [showAddItem, setShowAddItem] = useState(false);

  useEffect(() => {
      const fetchItems = async () => {
          try {
              const response = await fetch('http://localhost:6969/api/list/'); // Adjust URL as needed
              const data = await response.json();
              setItems(data.items);
              setItemsLeft(data.left);
              setLoading(false); // Data has been fetched
          } catch (error) {
              console.error('Error fetching items:', error);
              setLoading(false);
          }
      };

      fetchItems();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const deleteItem = async (id) => {
    setItems(items.filter(item=>item._id!==id))
    try {
      const response = await fetch("http://localhost:6969/api/list/deleteItem", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: id }),
      });

      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error("Error adding item:", error);
    }
  
  }

  const saveItem = (id) => {    
    setItems(
      items.map(item => 
        item._id === id 
          ? { ...item, saved: !item.saved }  // Toggle 'saved' for the matching item
          : item  // Leave other items unchanged
      )
    );
  };
  
  return (
    <div className="App">
      <Header
        title={"Grocery App"}
        onAdd={() => setShowAddItem(!showAddItem)}
        showAdd={showAddItem}
      />
      {showAddItem && <AddItem onAdd={addItem}/>}
      <Table items={items} onDelete={deleteItem} onClick={saveItem}/>
      <Favorites favorites={items} onDelete={deleteItem} onClick={saveItem}/>
    </div>
  );
}

export default App;
