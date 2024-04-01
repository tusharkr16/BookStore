import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from "react-icons/fa";
import { Avatar } from "flowbite-react";
import propic from '../assets/profile.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';

const Review = () => {
    return (
        <div className='my-12 px-4 lg:px-24'>
            <div className='text-5xl font-bold text-center mb-10 leading-snug'>Our Customers</div>
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={40}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
                        <div className='space-y-6'>
                            <div className='text-amber-500 flex gap-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className='mt-7'>
                                <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ipsam exercitationem quidem facere, vitae sequi laboriosam facilis veritatis odio repellendus sapiente, repellat explicabo praesentium voluptatum vero dolor dolore odit unde!
                                </p>
                                <Avatar img={propic} alt="avatar of Jese" rounded className='w-10 mb-4' />
                                <h5 className='text-lg font-medium'>Mark Ping</h5>
                                <p className='text-base'>CEO, Google</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
                        <div className='space-y-6'>
                            <div className='text-amber-500 flex gap-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className='mt-7'>
                                <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ipsam exercitationem quidem facere, vitae sequi laboriosam facilis veritatis odio repellendus sapiente, repellat explicabo praesentium voluptatum vero dolor dolore odit unde!
                                </p>
                                <Avatar img={propic} alt="avatar of Jese" rounded className='w-10 mb-4' />
                                <h5 className='text-lg font-medium'>Mark Ping</h5>
                                <p className='text-base'>CEO, Google</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
                        <div className='space-y-6'>
                            <div className='text-amber-500 flex gap-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className='mt-7'>
                                <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ipsam exercitationem quidem facere, vitae sequi laboriosam facilis veritatis odio repellendus sapiente, repellat explicabo praesentium voluptatum vero dolor dolore odit unde!
                                </p>
                                <Avatar img={propic} alt="avatar of Jese" rounded className='w-10 mb-4' />
                                <h5 className='text-lg font-medium'>Mark Ping</h5>
                                <p className='text-base'>CEO, Google</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
                        <div className='space-y-6'>
                            <div className='text-amber-500 flex gap-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className='mt-7'>
                                <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ipsam exercitationem quidem facere, vitae sequi laboriosam facilis veritatis odio repellendus sapiente, repellat explicabo praesentium voluptatum vero dolor dolore odit unde!
                                </p>
                                <Avatar img={propic} alt="avatar of Jese" rounded className='w-10 mb-4' />
                                <h5 className='text-lg font-medium'>Mark Ping</h5>
                                <p className='text-base'>CEO, Google</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Review