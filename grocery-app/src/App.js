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
    },
    {
      id: 2,
      title: "Bananas",
      amount: 6,
    },
  ];

  const [showAddItem, setShowAddItem] = useState(false);
  const [list, setList] = useState([])

  return (
    <div className="App">
      <Header
        title={"Grocery App"}
        onAdd={() => setShowAddItem(!showAddItem)}
        showAdd={showAddItem}
      />
      {showAddItem && <AddItem onAdd={setList}/>}
      <Table items={items} />
    </div>
  );
}

export default App;
