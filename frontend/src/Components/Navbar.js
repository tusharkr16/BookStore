import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBlog, FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleButton = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        }
        return () => {

            window.addEventListener("scroll", handleScroll)
        }
    }, [])

    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Shop", path: "/shop" },
        { link: "Blog", path: "/blog" },
        { link: "Sell Your Books", path: "/admin/dashboard/manageBooks" },
    ]
    return (
        <header className='w-full bg-transparent  fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""}`}>
                <div className='flex justify-between  items-center text-base gap-8'>
                    {/* logo */}
                    <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'> <FaBlog className='inline-block' /> Books</Link>
                    <ul className='md:flex space-x-12 hidden'>
                        {navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>)}
                    </ul>

                    <div className='space-x-12 hidden lg:flex items-center'>
                        <button> <FaBars className='cursor-pointer hover:text-blue-700' /> </button>
                    </div>

                    <div className='lg:hidden'>
                        <button onClick={toggleButton}>
                            {
                                isMenuOpen ? <FaX className='h-5 w-5 text-black' /> : <FaBars className='h-5 w-5 text-black' />
                            }
                        </button>
                    </div>
                </div>
                <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`} >
                    {navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-white uppercase '>{link}</Link>)}
                </div>
            </nav>
        </header>
    )
}

export default Navbar