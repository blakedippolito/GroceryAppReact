import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import AddItem from "./components/AddItem";

function App() {
  const items = [
    {
      id: 1,
      title: "Apples",
      amount: 10,
      saved: true
    },
    {
      id: 2,
      title: "Bananas",
      amount: 6,
      saved: false
    },
  ];

  const [showAddItem, setShowAddItem] = useState(false);
  const [list, setList] = useState(items)

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: list.length+1
    }
    setList([...list, newItem])
  }

  const deleteItem = (id) => {
    console.log(`delete ${id}`)
    setList(list.filter(item=>item.id!==id))
  }

  const saveItem = (id) => {
    console.log(`Saved ${id}`);
    
    setList(
      list.map(item => 
        item.id === id 
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
      <Table items={list} onDelete={deleteItem} onClick={saveItem}/>
    </div>
  );
}

export default App;
