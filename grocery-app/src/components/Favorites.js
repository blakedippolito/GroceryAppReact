import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaTimes, FaPlus } from "react-icons/fa";
import "./Favorites.css"

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('http://localhost:6969/api/list/favorites/');
        const data = await response.json();
        setFavorites(data.favorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      const response = await fetch("http://localhost:6969/api/list/removeFavorite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from favorites");
      }

      const data = await response.json();
      setFavorites(favorites.filter(fav => fav._id !== id));
      console.log("Item removed from favorites:", data);
    } catch (error) {
      console.error("Error removing item from favorites:", error);
    }
  };

  const toggleFavorites = () => setShowFavorites(!showFavorites);

  return (
    <>
      <Button onClick={toggleFavorites}>
        {showFavorites ? "Hide Favorites" : "Show Favorites"}
      </Button>

      <Modal show={showFavorites} onHide={toggleFavorites}>
        <Modal.Header closeButton>
          <Modal.Title>Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((item) => (
                <li key={item._id}>
                  {item.item}
                  <FaPlus
                    style={{ color: "green", cursor: "pointer" }}
                    onClick={() => console.log('Adding')}
                  />
                  <FaTimes
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => removeFavorite(item._id)}
                  />
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
