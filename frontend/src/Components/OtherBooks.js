import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';


const OtherBooks = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('https://bookstore-i6jo.onrender.com/api/books/all-books');
            console.log(response.data);
            setBooks(response.data.slice(4, 15));
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchBooks();
    }, [])
    return (
        <div>
            <BookCard books={books} headline='Other Books' />
        </div>
    )
}

export default OtherBooks