import Item from "./Item";
import "./Table.css"

const Table = ({ items, onDelete, onClick }) => {
  console.log(items)
  return (
    <table>
      <thead>
        {/* <tr>
          <th>Item</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr> */}
      </thead>
      <tbody>
        {items.map((item) => (
          <Item key={item._id} item={item} onDelete={onDelete} onClick={onClick} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
