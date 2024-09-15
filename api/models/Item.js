const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    saved: {
        type: Boolean,
        required: false
    },
    completed: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Item', ItemSchema)