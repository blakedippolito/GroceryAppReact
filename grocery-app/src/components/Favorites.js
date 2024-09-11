// import AddButton from "./Button";
// // import Modal from 'react-bootstrap/Modal';
// import { useState } from "react";
// import "./Favorites.css";

// const Favorites = ({ favorites, onClick }) => {
//   const savedItems = favorites.filter((item) => item.saved === true);
//   const [showFavorites, setShowFavorites] = useState(false);

//   const toggleFavorites = () => {
//     setShowFavorites(!showFavorites);
//   };

//   const titleText = () => {
//     return showFavorites ? "Hide Favorites" : "Show Favorites";
//   };

//   return (
//     <>
//       <AddButton onClick={toggleFavorites} title={titleText()} />

//       {showFavorites && (
//         <ul>
//           {savedItems.map((item) => (
//             <li key={item.id}>{item.title}</li>
//           ))}
//         </ul>
//       )}

//     </>
//   );
// };

// export default Favorites;

import AddButton from "./Button";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import "./Favorites.css";

const Favorites = ({ favorites, onClick }) => {
  const savedItems = favorites.filter((item) => item.saved === true);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <>
      <AddButton onClick={toggleFavorites} title={showFavorites ? "Hide Favorites" : "Show Favorites"} className={'favoriteButton'}/>

      <Modal show={showFavorites} onHide={toggleFavorites}>
        <Modal.Header closeButton>
          <Modal.Title>Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {savedItems.length > 0 ? (
            <ul>
              {savedItems.map((item) => (
                <li key={item.id}>{item.title}</li>
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
