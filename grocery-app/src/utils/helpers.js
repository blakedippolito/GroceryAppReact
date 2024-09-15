const fetchItems = async () => {
  try {
    const response = await fetch("http://localhost:6969/api/list/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

const addItem = async (item) => {
  const res = await fetch("http://localhost:6969/api/list/addItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
};

const deleteItem = async (id) => {
  try {
    const response = await fetch("http://localhost:6969/api/list/deleteItem", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemID: id }),
    });

    const data = await response.json();
    console.log("Item deleted:", data);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

const fetchFavorites = async () => {
  try {
    const response = await fetch("http://localhost:6969/api/list/favorites/");
    const data = await response.json();
    console.log("Fetched Favorites: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
};

const addFavorite = async (item) => {
  console.log("Adding to favorites:", item);
  try {
    const response = await fetch("http://localhost:6969/api/list/addFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: item.item, amount: item.amount }), // Sending item data
    });

    if (!response.ok) {
      throw new Error("Failed to add favorite item");
    }

    const data = await response.json(); // Parsing the response data

    console.log("Item added to favorites:", data);
    return data;
  } catch (error) {
    console.error("Error adding favorite item:", error);
  }
};

const removeFavorite = async (id) => {
  try {
    const response = await fetch(
      "http://localhost:6969/api/list/removeFavorite",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: id }), // Pass both ID and name
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove item from favorites");
    }
    const data = await response.json();
    console.log("Deleted item: ", data);

    return data;
  } catch (error) {
    console.error("Error removing item from favorites:", error.message);
  }
};

const markComplete = async (id) => {
  try {
    const response = await fetch(
      "http://localhost:6969/api/list/markComplete",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: id }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove item from favorites");
    }
    const data = await response.json();
    console.log("Marked Complete: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const markIncomplete = async (id) => {
  try {
    const response = await fetch(
      "http://localhost:6969/api/list/markIncomplete",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: id }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove item from favorites");
    }
    const data = await response.json();
    console.log("Marked Complete: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  fetchItems,
  addItem,
  deleteItem,
  fetchFavorites,
  addFavorite,
  removeFavorite,
  markComplete,
  markIncomplete
};
