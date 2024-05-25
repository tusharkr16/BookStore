import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import axios from 'axios'
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { FaBackward } from "react-icons/fa6";

const EditBook = () => {
    const { id } = useParams();
    const bookCategories = [
        "Fiction",
        "Nonfiction",
        "Mystery",
        "History",
        "Romance",
        "Biography",
        "Thriller",
        "Horror",
        "Fantasy",
        "Suspense",
        "Self-help",
        "Children Books",
        "Travel"
    ];

    const [selectedCategory, setSelectedCategory] = useState(bookCategories[0]);
    const handleChangeSelectedValue = (event) => {
        setSelectedCategory(event.target.value);
    };

    const [bookData, setBookData] = useState({
        bookTitle: '',
        author: '',
        image: '',
        category: '',
        description: '',
        bookPDFUrl: ''
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5004/api/books/${id}`);
                setBookData(data);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchBook();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleReset = () => {
        setBookData({
            bookTitle: '',
            author: '',
            image: '',
            category: '',
            description: '',
            bookPDFUrl: ''
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            await axios.patch(`http://localhost:5004/api/books/${id}`, bookData, config);
            console.log('Book data updated successfully:', bookData);
        } catch (error) {
            console.error('Error updating book data:', error);
        }
    };

    return (
        <div className='flex'>
            <div className='hidden md:block'>
                <SideBar />
            </div>

            <div className='px-4 my-12'>
                <div>
                    <a href="/admin/dashboard/manageBooks" className=' md:hidden text-red-500 hover:text-blue-700 flex flex-row gap-2 mb-3'> <FaBackward className='mt-1' />Go Back</a>
                </div>
                <h2 className='mb-8 text-3xl font-bold'>Manage All The Books</h2>
                <form className="lg:w-[1180px] flex flex-wrap gap-4 mt-8" onSubmit={handleUpdate} method="POST">
                    <div className="flex w-full gap-8">
                        <div className='w-1/2'>
                            <Label htmlFor="bookTitle" value="Book Title" />
                            <TextInput id="bookTitle" type="text" value={bookData.bookTitle} name='bookTitle' onChange={handleInputChange} required />
                        </div>
                        <div className='w-1/2'>
                            <Label htmlFor="author" value="Author" />
                            <TextInput id="author" type="text" value={bookData.author} name='author' onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="flex w-full gap-8 mt-8">
                        <div className='w-1/2'>
                            <Label htmlFor="image" value="Image URL" />
                            <TextInput id="image" type="text" value={bookData.image} name='image' onChange={handleInputChange} required />
                        </div>
                        <div className='w-1/2'>
                            <Label htmlFor="category" value="Category" />
                            <Select name='categoryName' className='w-full rounded' value={bookData.category} onChange={handleInputChange}>
                                {bookCategories.map(option => <option key={option} value={option}>{option}</option>)}
                            </Select>
                        </div>
                    </div>

                    <div className="flex w-full gap-8 mt-8">
                        <div className='w-full'>
                            <Label htmlFor="description" value="Description" />
                            <Textarea id="description" type="text" value={bookData.description} name='description' onChange={handleInputChange} required className='w-full' rows={5} />
                        </div>
                    </div>

                    <div className='w-1/2'>
                        <Label htmlFor="bookPDFUrl" value="Book PDF URL" />
                        <TextInput id="bookPDFUrl" type="text" value={bookData.bookPDFUrl} name='bookPDFUrl' onChange={handleInputChange} className='w-full' required rows={6} />
                    </div>
                    <Button type="submit" className='w-full mt-5'>Submit</Button>
                    <Button type="button" onClick={handleReset} className='w-full mt-5'>Reset</Button>
                </form>
            </div>
        </div>
    );
};

export default EditBook;
