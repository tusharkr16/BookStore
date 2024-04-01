const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    author: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    bookTitle: {
        type: String,
        required: true,
    },

    bookPDFUrl: {
        type: String,
        required: true,
    }
},
    {
        timesStamps: true,

    });

const Books = mongoose.model("BookUpload", bookSchema);

module.exports = Books;