import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import AddItem from "./components/AddItem";
import Favorites from "./components/Favorites";
import helpers from "./utils/helpers";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);

  // Fetching items and favorites when the app loads
  useEffect(() => {
    const fetchItems = async () => {
      const data = await helpers.fetchItems();
      setItems(data.items);
    };

    const fetchFavorites = async () => {
      const data = await helpers.fetchFavorites();
      setFavorites(data.favorites);
    };

    fetchItems();
    fetchFavorites();
  }, []);

  //Add Item
  const addItem = async (item) => {
    const data = await helpers.addItem(item);
    setItems([...items, data]);
  };

  //Delete Item
  const deleteItem = async (id) => {
    setItems(items.filter((item) => item._id !== id));
    await helpers.deleteItem(id);
  };

  // Function to remove a favorite
  const removeFavorite = async (id) => {
    setFavorites(favorites.filter((fav) => fav._id !== id));
    await helpers.removeFavorite(id);
  };

  // Function to add a favorite
  const addFavorite = async (item) => {
    const addedFavorite = await helpers.addFavorite(item);
    setFavorites([...favorites, addedFavorite]);
  };

  //Function to toggle item.complete
  const toggleComplete = async (id) => {
    const item = items.find((item) => item._id === id);
    if (!item) return;

    const updatedItem = item.completed
      ? await helpers.markIncomplete(id)
      : await helpers.markComplete(id);

    // Update the items list in state
    setItems((prevItems) =>
      prevItems.map((i) =>
        i._id === id ? { ...i, completed: !i.completed } : i
      )
    );
  };
  // Function to update the item in the state (called when marking complete/incomplete)

  return (
    <div className="App">
      <Header
        title={"Grocery App"}
        onAdd={() => setShowAddItem(!showAddItem)}
        showAdd={showAddItem}
        onAddItem={addItem}
      />
      <div className="main">
        {showAddItem && (
          <AddItem
            onAdd={addItem}
            
          />
        )}

        <h3 className="itemLeft">
          <span>Items Left: </span>{" "}
          {items.filter((item) => !item.completed).length}
        </h3>
      </div>
      <Table
        items={items}
        favorites={favorites}
        onDelete={deleteItem}
        onAddFavorite={addFavorite}
        onRemoveFavorite={removeFavorite}
        onUpdateItem={toggleComplete}
      />
      <Favorites
        allItems={items}
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        onAddFavorite={addFavorite}
        onAddItem={addItem}
      />
    </div>
  );
}

export default App;
