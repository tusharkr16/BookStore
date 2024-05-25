import React, { useState } from 'react';
import SideBar from '../Components/SideBar';
import { Button, Checkbox, Label, Select, TextInput, Textarea } from "flowbite-react";
import axios from 'axios';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { FaBackward } from "react-icons/fa6";

const UploadBooks = () => {
    const bookCategories = [
        "Fiction",
        "Nonfiction",
        "Mistory",
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

    ]
    const [selectedCategory, setSelectedCategory] = useState(bookCategories[0]);
    const handleChangeSelectedValue = (event) => {
        setSelectedCategory(event.target.value);
        console.log(event.target.value)
    }

    const handleReset = () => {
        const form = document.getElementById('uploadBookForm');
        form.reset();
    }

    const handleBookSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const bookTitle = formData.get('bookTitle');
        const author = formData.get('author');
        const image = formData.get('image');
        const category = formData.get('categoryName');
        const bookPDFUrl = formData.get('bookPDFUrl');
        const description = formData.get('description');
        const price = formData.get('price')
        const bookObj = {
            author, image, category, bookPDFUrl, bookTitle, description, price
        }
        console.log(bookObj);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const response = axios.post('https://bookstore-9kvi.onrender.com/api/books', bookObj,
                config
            );
            <Alert Alert color="success" onDismiss={() => alert('Alert dismissed!')} >
                <span className="font-medium">Book Uploaded Successfully</span>
            </Alert >

        } catch (error) {
            console.log(error);
            <Alert Alert color="failure" icon={HiInformationCircle} >
                <span className="font-medium">Error occurred!</span> Change a few things up and try submitting again.
            </Alert >
        }

    };
    return (
        <>
            <div className='flex'>
                <div className='hidden md:block'>
                    <SideBar />
                </div>
                <div className='px-4 my-12'>
                    <div>
                        <a href="/admin/dashboard/manageBooks" className=' md:hidden text-red-500 hover:text-blue-700 flex flex-row gap-2 mb-3'> <FaBackward className='mt-1' />Go Back</a>
                    </div>
                    <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>

                    <form className="lg:w-[1180px] flex flex-wrap gap-4 mt-8" id="uploadBookForm" onSubmit={handleBookSubmit} method="POST">
                        <div className="flex w-full gap-8">
                            <div className='w-1/2'>
                                <Label htmlFor="bookTitle" value="Book Title" />
                                <TextInput id="bookTitle" type="text" placeholder="eg: The Fault In Our Stars" name='bookTitle' required />
                            </div>
                            <div className='w-1/2'>
                                <Label htmlFor="author" value="Author Name" />
                                <TextInput id="author" type="text" placeholder="eg: Chetan Bhagat" name='author' required />
                            </div>
                        </div>
                        <div className="flex w-full gap-8">
                            <div className='w-1/2'>
                                <Label htmlFor="price" value="price" />
                                <TextInput id="price" type="number" placeholder="Price" name='price' required />
                            </div>
                        </div>

                        <div className="flex w-full gap-8 mt-8">
                            <div className='w-1/2'>
                                <Label htmlFor="image" value="Image URL" />
                                <TextInput id="image" type="text" placeholder="image URL" name='image' required />
                            </div>
                            <div className='w-1/2'>
                                <Label htmlFor="author" value="Category" />
                                <Select name='categoryName' className='w-full rounded' id='inputState' value={selectedCategory} onChange={handleChangeSelectedValue}>
                                    {bookCategories.map(option => <option key={option} value={option}>{option}</option>)}
                                </Select>
                            </div>

                        </div>

                        <div className="flex w-full gap-8 mt-8">
                            <div className='w-full'> {/* Changed from 'w-1/2' to 'w-full' */}
                                <Label htmlFor="description" value="Book Description" />
                                <Textarea id="description" type="text" placeholder="Book Description" name='description' required className='w-full' rows={5} /> {/* Added 'className='w-full' */}
                            </div>

                        </div>
                        <div className='w-1/2'>
                            <Label htmlFor="bookPDFUrl" value="Book PDF Url" />
                            <TextInput id="bookPDFUrl" type="text" placeholder="bookPDFUrl" name='bookPDFUrl' className='w-full' required rows={6} />
                        </div>
                        <Button type="submit" className='w-full mt-5'>Submit</Button>
                        <Button type="submit" onClick={handleReset} className='w-full mt-5'>Reset</Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UploadBooks;
