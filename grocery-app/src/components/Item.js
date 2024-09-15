import { useState, useEffect } from "react";
import { FaTimes, FaHeart } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";

const Item = ({
  item,
  favorites,
  onDelete,
  onAddFavorite,
  onRemoveFavorite,
  onUpdateItem,
}) => {
  const [icon, setIcon] = useState("");
  const [isFavorited, setIsFavorited] = useState(
    favorites.some((fav) => fav.item === item.item)
  );
  const [isCompleted, setIsCompleted] = useState(item.completed);

  // UseEffect to update isFavorited when favorites list changes
  useEffect(() => {
    setIsFavorited(favorites.some((fav) => fav.item === item.item));
  }, [favorites, item.item]);

  // Fetch the icon for the item
  useEffect(() => {
    const fetchIcon = async (itemTitle) => {
      try {
        const res = await fetch(
          `http://localhost:6969/api/icons/search?icon=${itemTitle}`
        );
        const data = await res.json();
        setIcon(data.link);
      } catch (error) {
        console.error("Error fetching icon: ", error);
      }
    };

    if (item && item.item) {
      fetchIcon(item.item);
    }
  }, [item]);

  const handleDoubleClick = () => {
    onUpdateItem(item._id); // This will trigger the `toggleComplete` in the parent
    setIsCompleted(!item.completed)
  };
  const handleAddFavorite = async () => {
    await onAddFavorite(item);
    setIsFavorited(true);
  };

  const handleRemoveFavorite = async () => {
    const favoriteToRemove = favorites.find((fav) => fav.item === item.item);

    if (favoriteToRemove) {
      await onRemoveFavorite(favoriteToRemove._id);
      setIsFavorited(false);
    }
  };

  return (
    <tr
      key={item._id}
      onDoubleClick={handleDoubleClick}
      style={{ backgroundColor: isCompleted ? "#FFCCCB" : "white" }}
    >
      <td>
        {isFavorited ? (
          <FaHeart
            style={{ color: "green", cursor: "pointer" }}
            onClick={handleRemoveFavorite}
          />
        ) : (
          <FaHeartCirclePlus
            style={{ color: "red", cursor: "pointer" }}
            onClick={handleAddFavorite}
          />
        )}
      </td>
      <td>
        {item.item} {icon && <img src={icon} alt="icon" />}
      </td>
      <td>{item.amount}</td>
      <td>
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(item._id)}
        />
      </td>
    </tr>
  );
};

export default Item;
