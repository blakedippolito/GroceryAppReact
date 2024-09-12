import { FaTimes, FaHeart } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { useState, useEffect } from "react";

const Item = ({ item, onDelete, onClick }) => {
  const [isStriked, setIsStriked] = useState(false);
  const [icon, setIcon] = useState("");

  // UseEffect to fetch the icon when the item changes
  useEffect(() => {
    const fetchIcon = async (itemTitle) => {
      try {
        const res = await fetch(
          `http://localhost:6969/api/icons/search?icon=${itemTitle}`
        );
        const data = await res.json();
        console.log(data);
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

  return (
    <tr
      onDoubleClick={handleDoubleClick}
      style={{ backgroundColor: isStriked ? "#FFCCCB" : "white" }}
    >
      <td>
        {item.saved ? (
          <FaHeart
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => onClick(item._id)}
          />
        ) : (
          <FaHeartCirclePlus
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onClick(item._id)}
          />
        )}
      </td>
      <td>{item.item} {icon && <img src={icon} />}</td>
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
