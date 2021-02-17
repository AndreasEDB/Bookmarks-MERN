const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    linkDescription: {
        type: String,
    },
    linkUrl: {
        type: String,
        required: true
    },
    linkImg: {
        type: String
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }]
})

module.exports = mongoose.model('Link', linkSchema)