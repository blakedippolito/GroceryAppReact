const Item = require("../models/Item");
const Favorite = require("../models/Favorite");

module.exports = {
  getItems: async (req, res) => {
    try {
      const items = await Item.find();
      const itemsLeft = await Item.countDocuments({ completed: false });
      res.json({ items, left: itemsLeft });
    } catch (err) {
      console.error(err);
    }
  },
  addItem: async (req, res) => {
    try {
      const newItem = await Item.create({
        item: (req.body.item).charAt(0).toUpperCase()+(req.body.item).slice(1).trim(),
        amount: req.body.amount,
        saved: req.body.saved,
        completed: false
      });
      console.log(`${req.body.item} has been added!`);

      // Return the newly created item (including _id)
      res.status(201).json(newItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add item" });
    }
  },
  deleteItem: async (req, res) => {
    try {
      await Item.findOneAndDelete({ _id: req.body.itemID });
      console.log(`Deleted ${req.body.itemID}`);
      res.json("Deleted");
    } catch (err) {
      console.error(err);
    }
  },
  getFavorites: async (req, res) => {
    try {
      const favorites = await Favorite.find();
      res.json({ favorites });
    } catch (err) {
      console.error(err);
    }
  },
  addFavorite: async (req, res) => {
    try {
      const newFavorite = await Favorite.create({
        item: req.body.item,
        amount: req.body.amount,
      });
      res.status(201).json(newFavorite);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add item" });
    }
  },
  removeFavorite: async (req, res) => {
    const { itemID  } = req.body;
  
    try {
      // Try to find and remove by itemID
      let favorite = await Favorite.findByIdAndDelete(itemID);
  
      if (favorite) {
        res.status(200).json({ message: "Item successfully removed from favorites" });
      } else {
        // If no favorite was found, return a 404 error with a clear message
        res.status(404).json({ error: "Favorite item not found" });
      }
    } catch (error) {
      console.error("Error removing item from favorites:", error); // Log the error for debugging purposes
      res.status(500).json({ error: "An error occurred while removing the favorite" });
    }
  },
  

  markComplete: async (req, res) => {
    try {
      await Item.findOneAndUpdate(
        { _id: req.body.itemID },
        {
          completed: true,
        }
      );
      console.log("Marked complete");
      res.json("Completed");
    } catch (err) {
      console.error(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Item.findOneAndUpdate(
        { _id: req.body.itemID },
        {
          completed: false,
        }
      );
      console.log("Marked uncomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.error(err);
    }
  },
};
