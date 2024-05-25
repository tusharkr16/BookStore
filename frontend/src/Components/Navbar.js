import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { FaBlog, FaBars } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { FaCartPlus } from "react-icons/fa";
import { SnackbarProvider, useSnackbar } from 'notistack';
import Cart from '../Pages/Cart';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const toggleButton = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        const fetchDetail = () => {
            const userInfoString = localStorage.getItem('userInfo');
            const userInfo = JSON.parse(userInfoString);
            if (userInfo) {
                setToken(userInfo.token);
            }
        };

        window.addEventListener('scroll', handleScroll);
        fetchDetail();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        enqueueSnackbar('Logged out successfully', { variant: 'success' });
        // window.location.href = '/';
        Navigate('/');
    };



    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'Shop', path: '/shop' },
        { link: 'Sell Your Books', path: '/admin/dashboard/manageBooks' },
        { link: 'Login', path: '/login' },
        { link: 'Register', path: '/register' },
    ];

    // Conditionally remove Login and Register links if token is present
    if (token) {
        navItems.splice(navItems.findIndex(item => item.link === 'Login'), 1);
        navItems.splice(navItems.findIndex(item => item.link === 'Register'), 1);
    } else {
        // Remove Sell Your Books link if token is not present
        navItems.splice(navItems.findIndex(item => item.link === 'Sell Your Books'), 1);
    }

    return (
        <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? 'sticky top-0 left-0 right-0 bg-blue-300' : ''}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    <Link to='/' className='text-2xl font-bold text-blue-700 flex items-center gap-2'>
                        <FaBlog className='inline-block' /> Books
                    </Link>
                    <ul className='md:flex space-x-12 hidden'>
                        {navItems.map(({ link, path }) => (
                            <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                                {link}
                            </Link>
                        ))}
                        {token && (
                            <Link to='/logout' className='block text-base text-black uppercase cursor-pointer hover:text-blue-700' onClick={handleLogout}>
                                Logout
                            </Link>
                        )}
                    </ul>

                    <div className='space-x-12 hidden lg:flex items-center'>
                        {token && location.pathname !== '/cart' || location.pathname !== '/thanks' ? <button>
                            <Link to='/cart'>
                                <FaCartPlus className='cursor-pointer w-6 h-6 hover:text-blue-700' />
                            </Link>
                        </button> : <button>

                            <FaCartPlus className='cursor-pointer w-6 h-6 hover:text-blue-700' onClick={() => navigate('/cart')} />
                        </button>}

                    </div>
                    {
                        token && location.pathname !== '/cart' ? <div className='lg:hidden'>
                            <FaCartPlus className='cursor-pointer w-6 h-6 hover:text-blue-700' onClick={() => navigate('/cart')} />
                        </div> : ""
                    }



                    <div className='lg:hidden'>
                        <button onClick={toggleButton}>
                            {isMenuOpen ? <FaX className='h-5 w-5 text-black' /> : <FaBars className='h-5 w-5 text-black' />}

                        </button>
                    </div>

                </div>
                <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'}`}>
                    {navItems.map(({ link, path }) => (
                        <Link key={path} to={path} className='block text-base text-white uppercase'>
                            {link}
                        </Link>
                    ))}
                    {token && (
                        <button onClick={handleLogout} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
