import axios from 'axios';
import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log({ email, password });
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.post('https://bookstore-9kvi.onrender.com/api/userRoutes/all-users', { email, password }, config)
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            Navigate('/shop');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Navbar />

            <div className='mx-auto mx-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
                <h1 className='text-2xl font-bold text-secondary sm:text-3xl text-center '>Get Started Today</h1>
                <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>Explore our comprehnsive library of courses, meticulously crafted to cater to all levels of expertise</p>

                <div className='mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'>
                    <form className='space-y-4'>
                        <p className='text-center text-red-400 text-lg font-medium'>Sign in to your account</p>
                        <div>
                            <label htmlFor="email" className='sr-only'>Email</label>
                            <div className='relative'>
                                <input type="email" name='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Password" className='sr-only'>Password</label>
                            <div className='relative'>
                                <input type={showPassword ? 'text' : 'password'} name='Password' placeholder='Enter Password' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <span onClick={() => setShowPassword(!showPassword)} className='absolute inset-y-0 end-0 grid place-content-center  px-4 '>
                                    {showPassword ? <FaEyeSlash className='h-4 w-4 text-gray-400' /> : <FaEye className='h-4 w-4 text-gray-400' />}

                                </span>
                            </div>
                        </div>
                        <button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white ' onClick={submitHandler}>Sign In</button>
                        <div>
                            <button type="submit" onClick={submitHandler} className='bg-blue-500  w-full rounded-lg px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 '>Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Login