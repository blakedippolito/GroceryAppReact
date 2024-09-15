import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaTimes, FaPlus } from "react-icons/fa";
import "./Favorites.css";

const Favorites = ({ allItems, favorites, onRemoveFavorite, onAddFavorite, onAddItem }) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [comparison, setComparison] = useState([]);

  // Toggle Favorite Modal
  const toggleFavorites = () => setShowFavorites(!showFavorites);

  // Remove Favorite from Modal
  const removeFavorite = async (id) => {
    try {
      await onRemoveFavorite(id); // Call the removeFavorite function passed from the parent
    } catch (error) {
      console.error("Error removing item from favorites:", error);
    }
  };



  // Compare Items db to Favorites db
  const compare = () => {
    const comparisonArray = allItems.map((item) =>
      favorites.some((fav) => fav.item === item.item)
    );
    setComparison(comparisonArray);
  };

  // Run the comparison every time favorites or allItems change
  useEffect(() => {
    compare();
  }, [favorites, allItems]);

  return (
    <>
      <Button onClick={toggleFavorites}>
        {showFavorites ? "Hide Favorites" : "Show Favorites"}
      </Button>

      <Modal show={showFavorites} onHide={toggleFavorites}>
        <Modal.Header closeButton>
          <Modal.Title>Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body className="favoriteBody">
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((item) => (
                <li key={item._id}>
                  {item.item}
                  <button className="favoriteBtn">Add to List<FaPlus
                    style={{ color: "green", cursor: "pointer" }}
                    onClick={() => onAddItem(item)} // Use the addFavorite function
                  /></button>
                  <button className="favoriteBtn">Remove from Favorites<FaTimes
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => removeFavorite(item._id)}
                  /></button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No favorites saved.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleFavorites}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Favorites;
