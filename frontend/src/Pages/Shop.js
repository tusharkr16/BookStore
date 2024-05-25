import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import Navbar from '../Components/Navbar';
import { SnackbarProvider, useSnackbar } from 'notistack';


const Shop = () => {
    const [books, setBooks] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [token, setToken] = useState('');
    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5004/api/books/all-books');
            setBooks(response.data);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchBooks();
        const userInfoString = localStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);
        if (userInfo) {
            setToken(userInfo.token);
        }
    }, []);

    const addToCart = async (bookId) => {
        console.log(token);
        if (!token) {
            enqueueSnackbar('You need to login first', { variant: 'warning' });

        }
        else {

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.post('http://localhost:5004/cart', { productId: bookId, quantity: 1 }, config);
                if (response.status === 201) {
                    enqueueSnackbar('Added to Cart', { variant: 'success' });
                }
                if (response.status === 420) {
                    enqueueSnackbar('Product already in Cart', { variant: 'warning' });
                }
            } catch (error) {
                console.error('Cart Error:', error);
                enqueueSnackbar('Add to cart failed. Please try again.', { variant: 'error' });
            }

        }
    }
    return (
        <>
            <Navbar />
            <div className='mt-28 px-4 lg:px-24 '>
                <h2 className='text-5xl font-bold text-center'>All Books Are Here</h2>
                <div className='grid gap-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 mt-5'>
                    {
                        books.map(book => <Card>
                            <img src={book.image} alt="" className='h-96' />
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {book.bookTitle.slice(0, 20)}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {book.description.slice(0, 100)}
                            </p>
                            <button className='bg-blue-700 font-semibold text-white py-2 rounded' onClick={() => addToCart(book._id)}>Add To Cart</button>
                        </Card>)
                    }
                </div>
            </div>
        </>
    )
}

export default Shop