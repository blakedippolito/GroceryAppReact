const Item = require("../models/Item")

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
            await Item.create({item: req.body.itemName, amount: req.body.itemAmount, completed: false})
            console.log(`${req.body.itemName} has been added!`)
            res.status(201).json({ message: `${req.body.itemName} added successfully` });
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