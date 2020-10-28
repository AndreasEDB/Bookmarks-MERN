const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    quoteText: {
        type: String,
        required: true
    },
    quoteAuthor: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
})

module.exports = mongoose.model('Quote', quoteSchema)