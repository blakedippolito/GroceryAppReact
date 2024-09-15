import Item from "./Item";
import "./Table.css"

const Table = ({ items, favorites, onDelete, onAddFavorite, onRemoveFavorite, onUpdateItem }) => {
  return (
    <table>
      <thead>
        {/* Add table headers if needed */}
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
