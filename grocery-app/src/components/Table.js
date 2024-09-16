import Item from "./Item";
import "./Table.css";

const Table = ({ items, favorites, onDelete, onAddFavorite, onRemoveFavorite, onUpdateItem }) => {
  return (
    <table>
      <thead>
        {/* <tr>
          <th>Favorite</th>
          <th>Item</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr> */}
      </thead>
      <tbody>
        {items.map((item) => (
          <Item
            key={item._id}
            item={item}
            favorites={favorites}
            onDelete={onDelete}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
