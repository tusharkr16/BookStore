import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import { Table } from "flowbite-react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert } from "flowbite-react";

const ManageBooks = () => {
    const [books, setBooks] = useState([]);

    const handleDelete = async (id) => {
        console.log(id);
        try {
            await axios.delete(`https://bookstore-9kvi.onrender.com/api/books/${id}`);

            setBooks(prevBooks => prevBooks.filter(book => book._id !== id));

            alert('Book Deleted Successfully');
        } catch (error) {
            console.log(error);
        }
    }

    const fetchBooks = async () => {
        try {
            const response = await axios.get('https://bookstore-9kvi.onrender.com/api/books/all-books');
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
        <>
            <div className='flex'>
                <SideBar />
                <div className='px-4 my-12'>
                    <h2 className='mb-8 text-3xl font-bold'>Manage All The Books</h2>

                    <Table className='lg:w-[1180px]'>
                        <Table.Head>
                            <Table.HeadCell>Book Name</Table.HeadCell>
                            <Table.HeadCell>Author Name</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Prices</Table.HeadCell>
                            <Table.HeadCell>Edit</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {books.map(book => (
                                <Table.Row key={book.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {book.bookTitle}
                                    </Table.Cell>
                                    <Table.Cell>{book.author}</Table.Cell>
                                    <Table.Cell>{book.category}</Table.Cell>
                                    <Table.Cell>$1000</Table.Cell>
                                    <Table.Cell>
                                        <Link className='font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5' to={`/admin/dashboard/edit-books/${book._id}`}>Edit</Link>
                                        <button onClick={() => handleDelete(book._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>Delete</button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ManageBooks