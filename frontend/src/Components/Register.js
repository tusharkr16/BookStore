import React, { useState } from 'react';
import { AiOutlineLock, AiOutlineMail, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        photoUrl: ''
    });
    const Navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const response = axios.post('http://localhost:5004/api/userRoutes', formData, config);
            <Alert Alert color="success" onDismiss={() => alert('Alert dismissed!')} >
                <span className="font-medium">Registrer Successful</span>
            </Alert >
            Navigate('/login');
        } catch (error) {
            console.log(error);
            <Alert Alert color="failure" icon={HiInformationCircle} >
                <span className="font-medium">Error occurred!</span> Change a few things up and try submitting again.
            </Alert >
        }
    };

    return (
        <>
            <Navbar />
            <div className='flex justify-center items-center pt-14 bg-gray-100 '>
                <div className='bg-white p-8 rounded-lg shadow-md '>
                    <h2 className='text-3xl font-bold text-center mb-6 '>Please Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='flex items-center gap-5'>
                            <div className='mb-4'>
                                <label htmlFor="name" className='block text-gray-700 font-bold mb-2 '>
                                    <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" /> Name
                                </label>
                                <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='enter your name' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="email" className='block text-gray-700 font-bold mb-2 '>
                                    <AiOutlineMail className="inline-block mr-2 mb-1 text-lg" /> Email
                                </label>
                                <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='enter your email' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='mb-4'>
                                <label htmlFor="password" className='block text-gray-700 font-bold mb-2 '>
                                    <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" /> Password
                                </label>
                                <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='enter your password' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="confirmPassword" className='block text-gray-700 font-bold mb-2 '>
                                    <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" /> Confirm Password
                                </label>
                                <input type="password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='confirm your password' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='mb-4'>
                                <label htmlFor="photoUrl" className='block text-gray-700 font-bold mb-2 '>
                                    <AiOutlinePicture className="inline-block mr-2 mb-1 text-lg" /> Photo URL
                                </label>
                                <input type="text" name='photoUrl' value={formData.photoUrl} onChange={handleChange} placeholder='enter your photo url' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className='bg-blue-500  w-full rounded-lg px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 '>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;
