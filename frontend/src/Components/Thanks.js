import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Thanks = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <div className='bg-green-700 min-h-screen flex flex-col items-center'>
            <div className='bg-white rounded-lg shadow-lg p-8 mt-10 w-11/12 md:w-2/3 lg:w-1/2'>
                <h1 className='text-center text-3xl font-bold text-green-700'>Yay! It's ordered 🤩</h1>
                <p className='text-center text-lg mt-4'>Thank you for your purchase! Your order has been successfully placed.</p>
                <div className='mt-6'>
                    <h2 className='text-2xl font-semibold text-gray-800'>Order Summary</h2>
                    <ul className='mt-4 text-gray-700'>
                        <li><strong>Order Number:</strong> #123456</li>
                        <li><strong>Date:</strong>{formattedDate}</li>
                    </ul>
                </div>
                <div className='mt-8 flex justify-around'>
                    <Link to='/'>
                        <button className='bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600'>
                            Go to Homepage
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Thanks;
