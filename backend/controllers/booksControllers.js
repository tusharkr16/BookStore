const asyncHandler = require('express-async-handler');
const BookUpload = require('../models/booksModel');

const uploadBooks = asyncHandler(async (req, res) => {
    const { author, image, category, description, bookTitle, bookPDFUrl } = req.body;
    if (!author || !image || !category || !description || !bookTitle || !bookPDFUrl) {
        res.status(400)
        throw new Error("Please Fill all the fields");
    }
    else {
        const data = new BookUpload({ author, image, category, description, bookTitle, bookPDFUrl });
        const createdUpload = await data.save();

        res.status(201).json(createdUpload);
    }
});

const getAllBooks = asyncHandler(async (req, res) => {
    let query = {}
    if (req.query?.category) {
        query = { category: req.query.category }
    }

    if (req.query?.author) {
        query = { author: req.query.author }
    }
    const books = await BookUpload.find(query);
    res.send(books);
});

const getBookById = asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    try {
        const existingBook = await BookUpload.findById(bookId);
        if (existingBook) {
            res.send(existingBook);
        }
        else {
            res.status(400).send("not found");
        }
    } catch (error) {
        console.log(error);
    }
})

const updateBook = asyncHandler(async (req, res) => {
    const { author, image, category, description, bookTitle, bookPDFUrl } = req.body;
    const bookId = req.params.id;

    try {

        const existingBook = await BookUpload.findById(bookId);

        if (!existingBook) {
            res.status(404);
            throw new Error("Book not found");
        }


        if (existingBook._id.toString() !== bookId) {
            res.status(401);
            throw new Error("Book ID does not match");
        }


        existingBook.author = author;
        existingBook.image = image;
        existingBook.category = category;
        existingBook.description = description;
        existingBook.bookTitle = bookTitle;
        existingBook.bookPDFUrl = bookPDFUrl;


        const updatedBook = await existingBook.save();

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteBook = asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    try {
        const existingBook = await BookUpload.findById(bookId);

        if (!existingBook) {
            res.status(404);
            throw new Error("Book not found");
        }


        if (existingBook._id.toString() !== bookId) {
            res.status(401);
            throw new Error("Book ID does not match");
        }

        await existingBook.deleteOne();
        res.send("book deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = { uploadBooks, getAllBooks, updateBook, deleteBook, getBookById }