import React from 'react'
import BannerCard from './BannerCard'

const Banner = () => {
    return (
        <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
            <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
                <div className='md:w-1/2 h-full space-y-8' >
                    <h2 className='text-5xl font-bold leading-snug text-black'>Buy And Sell Your Books <span className='text-blue-700'>For The Best Prices</span></h2>
                    <p className='md:w-4/5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus id et labore illo consectetur sit voluptates fuga. Ex dicta optio quia obcaecati. Inventore assumenda perferendis laudantium praesentium in? Cum, necessitatibus.
                        Quisquam hic repudiandae deserunt itaque dolores. .</p>
                    <div>
                        <input type="search" name='search' id='search' placeholder='search a book' className='py-2 px-2 rounded-s-sm outline-none' />
                        <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'>Search</button>
                    </div>

                </div>
                <div className='md:w-1/2'>
                    <BannerCard />
                </div>
            </div>
        </div>
    )
}

export default Banner