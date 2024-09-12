import { FaTimes, FaHeart } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { useState, useEffect } from "react";

const Item = ({ item, onDelete, onClick }) => {
  const [isStriked, setIsStriked] = useState(false);
  const [icon, setIcon] = useState("");
  const [isFavorited, setIsFavorited] = useState(item.saved)

  // UseEffect to fetch the icon when the item changes
  useEffect(() => {
    const fetchIcon = async (itemTitle) => {
      try {
        const res = await fetch(
          `http://localhost:6969/api/icons/search?icon=${itemTitle}`
        );
        const data = await res.json();
        setIcon(data.link); // Assuming `data.icon` contains the icon info
      } catch (error) {
        console.error("Error fetching icon: ", error);
      }
    };

    // Call the fetch function if item exists
    if (item && item.item) {
      fetchIcon(item.item); // Assuming you're passing `item.title` to the API
    }
  }, [item]);

  const handleDoubleClick = () => {
    setIsStriked(!isStriked);
  };

  const addFavorite = async () => {
    console.log('Added')
    try {
      const response = await fetch(
        "http://localhost:6969/api/list/addFavorite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({item: item.item, amount: item.amount}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const data = await response.json();
      setIsFavorited(true);
      console.log("Item added to server:", data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await fetch(
        "http://localhost:6969/api/list/removeFavorite",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // Pass the item or its unique identifier to the backend
          body: JSON.stringify({ itemID: item._id, itemName: item.item }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      const data = await response.json();
      setIsFavorited(false); // Update UI state
      console.log("Item removed from favorites:", data);
    } catch (error) {
      console.error("Error removing item from favorites:", error);
    }
  };

  return (
    <tr
      onDoubleClick={handleDoubleClick}
      style={{ backgroundColor: isStriked ? "#FFCCCB" : "white" }}
    >
      <td>
        {item.saved ? (
          <FaHeart
            style={{ color: "green", cursor: "pointer" }}
            onClick={removeFavorite}
          />
        ) : (
          <FaHeartCirclePlus
            style={{ color: "red", cursor: "pointer" }}
            onClick={addFavorite}
          />
        )}
      </td>
      <td>
        {item.item} {icon && <img src={icon} />}
      </td>
      <td>{item.amount}</td>
      <td>
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(item._id)} // Ensure correct delete function
        />
      </td>
    </tr>
  );
};

export default Item;
