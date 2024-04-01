import React from 'react'
import Banner from '../Components/Banner'
import FavouriteBooks from '../Components/FavouriteBooks'
import BookSeller from '../Components/BookSeller'
import PromoBanner from '../Components/PromoBanner'
import OtherBooks from '../Components/OtherBooks'
import Review from '../Components/Review'
import FooterComponent from '../Components/FooterComponent'
import Navbar from '../Components/Navbar'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <FavouriteBooks />
            <BookSeller />
            <PromoBanner />
            <OtherBooks />
            <Review />
            <FooterComponent />
        </div>
    )
}

export default Home