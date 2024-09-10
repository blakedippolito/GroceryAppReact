import { FaTimes, FaHeart } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";

const Item = ({ item, onDelete, onClick }) => {
  return (
    <tr>
      <td>
        {item.saved ? (
          <FaHeart
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => onClick(item.id)}
          />
        ) : (
          <FaHeartCirclePlus
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onClick(item.id)}
          />
        )}
      </td>

      <td>{item.title}</td>
      <td>{item.amount}</td>
      <td>
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(item.id)} // Ensure correct delete function
        />
      </td>
    </tr>
  );
};

export default Item;
