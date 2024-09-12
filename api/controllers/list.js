const Item = require("../models/Item")
const Favorite = require("../models/Favorite")

module.exports = {
    getItems: async (req, res) => {
        try {
            const items = await Item.find()
            const itemsLeft = await Item.countDocuments({completed: false})
            res.json({ items, left: itemsLeft })

        } catch (err) {
            console.error(err)
        }
    },
    addItem : async (req,res) => {
        try {
            await Item.create({item: req.body.item, amount: req.body.amount, completed: false})
            console.log(`${req.body.item} has been added!`)
            res.status(201).json({ message: `${req.body.item} added successfully` });
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Failed to add item" });
        }
    },
    deleteItem: async (req,res) => {
        try {
            await Item.findOneAndDelete({_id: req.body.itemID})
            console.log(`Deleted ${req.body.itemID}`)
            res.json('Deleted')
        } catch (err) {
            console.error(err)
        }
    },
    getFavorites: async (req, res) => {
        try {
            const favorites = await Favorite.find()
            res.json({ favorites })

        } catch (err) {
            console.error(err)
        }
    },
    addFavorite : async (req,res) => {
        try {
            await Favorite.create({item: req.body.item, amount: req.body.amount})
            console.log(`${req.body.item} has been added!`)
            res.status(201).json({ message: `${req.body.item} added successfully` });
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Failed to add item" });
        }
    },
    removeFavorite : async (req,res) => {
        const { itemID, itemName } = req.body;

        try {
          // Try to find and remove by itemID
          let favorite = await Favorite.findByIdAndDelete(itemID);
          
          // If not found by ID, try by itemName
          if (!favorite) {
            favorite = await Favorite.findOneAndDelete({ item: itemName });
          }
      
          if (favorite) {
            res.json({ message: 'Item removed from favorites' });
          } else {
            res.status(404).json({ error: 'Item not found' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Error removing item' });
        }
    },
      
    markComplete: async (req,res)=> {
        try {
            await Item.findOneAndUpdate({_id: req.body.itemID}, {
                completed:true
            })
            console.log('Marked complete')
            res.json('Completed')
            
        } catch (err) {
            console.error(err)
        }
    },
    markIncomplete: async (req,res)=> {
        try {
            await Item.findOneAndUpdate({_id: req.body.itemID}, {
                completed:false
            })
            console.log('Marked uncomplete')
            res.json('Marked Incomplete')
        } catch (err) {
            console.error(err)
        }
    },

}