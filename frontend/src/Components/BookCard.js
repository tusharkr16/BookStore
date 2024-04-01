import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import { FaCartPlus } from "react-icons/fa6";



const BookCard = ({ headline, books }) => {
    return (
        <div className='my-16 px-4 lg:px-24 '>
            <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>
            <div className='mySwiper'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                        loop: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className=" mySwiper w-full h-full "
                >
                    {books.map(book => ( // corrected mapping to 'books'
                        <SwiperSlide key={book._id}>
                            <Link to="/">
                                <div className=' flex justify-center mt-3'>
                                    <img src={book.image} alt="" />
                                    <div className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded'>
                                        <FaCartPlus className='w-4 h-4 text-white' />

                                    </div>
                                </div>
                                <div className='text-center'>
                                    <h3 className='font-bold  justify-center'>{book.bookTitle}</h3>
                                    <p>{book.author}</p>
                                </div>
                                <div className='text-center'>
                                    <p>$10.0</p>
                                </div>
                            </Link>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default BookCard