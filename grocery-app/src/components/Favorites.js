import AddButton from "./Button";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./Favorites.css";
import { FaTimes } from "react-icons/fa";

const Favorites = ({ favorites, onClick, onDelete }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  // Filter saved items
  const savedItems = favorites.filter((item) => item.saved === true);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <>
      <AddButton
        onClick={toggleFavorites}
        title={showFavorites ? "Hide Favorites" : "Show Favorites"}
        className={"favoriteButton"}
      />

      <Modal show={showFavorites} onHide={toggleFavorites}>
        <Modal.Header closeButton>
          <Modal.Title>Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {savedItems.length > 0 ? (
            <ul>
              {savedItems.map((item) => (
                <li key={item._id}>
                  {item.item}
                  <FaTimes
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => onClick(item._id)} // Update saved state on click
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
