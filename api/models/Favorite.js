const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Favorite', FavoriteSchema)