import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaTimes, FaPlus } from "react-icons/fa";
import "./Favorites.css";

const Favorites = ({
  allItems,
  favorites,
  onRemoveFavorite,
  onAddFavorite,
  onAddItem,
}) => {
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
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-2">{item.item}</td>
                    <td className="px-4 py-2">
                      <button className="favoriteBtn px-2 py-1 mr-2 bg-green-500 text-white rounded">
                        Add to List
                        <FaPlus
                          style={{
                            color: "white",
                            cursor: "pointer",
                            marginLeft: "5px",
                          }}
                          onClick={() => onAddItem(item)}
                        />
                      </button>
                      <button className="favoriteBtn px-2 py-1 bg-red-500 text-white rounded">
                        Remove from Favorites
                        <FaTimes
                          style={{
                            color: "white",
                            cursor: "pointer",
                            marginLeft: "5px",
                          }}
                          onClick={() => removeFavorite(item._id)}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
