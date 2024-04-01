import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from './BookCard';

const FavouriteBooks = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books/all-books');
            console.log(response.data);
            setBooks(response.data);
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchBooks();
    }, [])
    return (
        <div>
            <BookCard books={books} headline='Best Seller Books' />
        </div>
    )
}

export default FavouriteBooks