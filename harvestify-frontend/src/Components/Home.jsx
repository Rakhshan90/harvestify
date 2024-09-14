import React from 'react'
import hero from './illustration-working.svg'
import twitter from './icon-twitter.svg'
import pinterest from './icon-pinterest.svg'
import facebook from './icon-facebook.svg'
import instagram from './icon-instagram.svg'
import accessibility from './accessibility.png'
import lock from './lock.png'
import effecient from './effecient.png'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* // <!-- hero section --> */}
            <section id="hero" className='dark:bg-slate-800 dark:text-white'>
                <div className="container flex flex-col-reverse mx-auto p-6 lg:px-12 lg:flex-row">
                    {/* <!-- content container --> */}
                    <div className="flex flex-col space-y-10 mb-44 lg:mt-16 lg:w-1/2 xl:mb-52">
                        <h1 className="text-5xl text-center font-bold lg:text-6xl lg:max-w-lg lg:text-left">
                            Welcome to E-auction platform
                        </h1>
                        <p className="text-2xl text-gray-400 text-center lg:max-w-md lg:text-left">
                            Harvestify: Grow your success. Buy and sell agricultural products with ease. (Simple and benefit-oriented)
                        </p>
                        <div className="mx-auto lg:mx-0">
                            <button
                                onClick={() => navigate('/auctions')}
                                className="py-5 px-10 text-2xl bg-teal-500 text-white rounded-full hover:opacity-50">Get
                                started</button>
                        </div>
                    </div>
                    {/* <!-- img container--> */}
                    <div className="mb-24 mx-auto md:w-180 lg:mb-0 lg:w-1/2">
                        <img src={hero} alt="" />
                    </div>
                </div>
            </section>


            {/* <!-- Feature box --> */}
            <section id="feature" className="py-32 bg-slate-100 dark:bg-slate-800">
                <div className="container relative flex flex-col items-start mx-auto px-6 md:flex-row md:space-x-7">
                    {/* <!-- horizontal line --> */}
                    <div className="hidden absolute top-24 left-16 w-10/12 h-3 bg-cyan-300 md:block"></div>

                    {/* <!-- vertical line --> */}
                    <div className="absolute w-2 left-1/2 h-full -ml-1 bg-cyan-300 md:hidden"></div>

                    {/* <!-- Box 1 --> */}
                    <div className="relative flex flex-col space-y-6 p-6 bg-white 
                    dark:bg-slate-600 rounded-lg md:w-1/3">
                        {/* <!-- img positioning --> */}
                        <div className="absolute -ml-10 -top-10 left-1/2 md:left-16">
                            {/* <!-- img container for background and center --> */}
                            <div className="bg-black flex items-center justify-center h-20 w-20 rounded-full p-4">
                                <img src={accessibility} alt="" className='invert' />
                            </div>
                        </div>

                        <h5 className="font-bold pt-6 text-xl text-center md:text-left dark:text-white uppercase">
                            Available 24/7
                        </h5>
                        <p className="text-center text-gray-400 md:text-left">
                            Explore our extensive range of products, from the comfort of your home or on the go. Our website is accessible 24/7, allowing you to browse and discover new items at your convenience.
                        </p>
                    </div>
                    {/* <!-- Box 2 --> */}
                    <div className="relative flex flex-col space-y-6 p-6 mt-24 bg-white rounded-lg md:mt-8 
                    dark:bg-slate-600 md:w-1/3">
                        {/* <!-- img positioning --> */}
                        <div className="absolute -ml-10 -top-10 left-1/2 md:left-16">
                            {/* <!-- img container for background and center --> */}
                            <div className="bg-black flex items-center justify-center h-20 w-20 rounded-full p-4">
                                <img src={lock} alt="" className='invert' />
                            </div>
                        </div>

                        <h5 className="font-bold pt-6 text-xl text-center md:text-left dark:text-white uppercase">
                            Fast and secure
                        </h5>
                        <p className="text-center text-gray-400 md:text-left">
                            We understand that your trust is our most valuable asset.  Knowing you feel safe sharing your information with us is essential. That's why we prioritize implementing robust security measures to protect your data.
                        </p>
                    </div>
                    {/* <!-- Box 3 --> */}
                    <div className="relative flex flex-col space-y-6 p-6 mt-24 bg-white rounded-lg md:mt-16 
                    dark:bg-slate-600 md:w-1/3">
                        {/* <!-- img positioning --> */}
                        <div className="absolute -ml-10 -top-10 left-1/2 md:left-16">
                            {/* <!-- img container for background and center --> */}
                            <div className="bg-black flex items-center justify-center h-20 w-20 rounded-full p-4">
                                <img src={effecient} alt="" className='invert' />
                            </div>
                        </div>

                        <h5 className="font-bold pt-6 text-xl text-center md:text-left dark:text-white uppercase">
                            EFficient bidding and auction process
                        </h5>
                        <p className="text-center text-gray-400 md:text-left">
                            We've curated a seamless and efficient bidding experience to make sure your journey with us is as enjoyable as it is rewarding.
                        </p>
                    </div>
                </div>
            </section>

            {/* footer section */}
            <section id="footer">
                {/* <!-- footer section --> */}
                <footer className="py-16 bg-slate-900 px-10">
                    <div className="container flex flex-col items-center 
                    justify-between space-y-16 mx-auto md:flex-row md:space-y-0 md:items-start">

                        {/* <!-- footer logo img --> */}
                        <h1 className="font-bold text-white text-4xl">Harvestify</h1>

                        {/* <!-- menus container --> */}
                        <div className="flex flex-col space-y-16 md:flex-row md:space-y-0 md:space-x-20">
                            {/* <!-- menu 1 --> */}
                            <div className="flex flex-col items-center w-full md:items-start">
                                <div className="mb-5 font-bold text-white">Features</div>
                                <div className="flex flex-col space-y-3 items-center md:items-start">
                                    <a href="#" className="text-slate-300 capitalize">Seamless User Management</a>
                                    <a href="#" className="text-slate-300 capitalize">Empowering Farmers</a>
                                    <a href="#" className="text-slate-300 capitalize">
                                        Streamlined Auctions for Buyers
                                    </a>
                                    <a href="#" className="text-slate-300 capitalize">Day or Night theme</a>
                                    <a href="#" className="text-slate-300 capitalize">All Devices Welcome</a>
                                </div>
                            </div>
                            {/* <!-- menu 2 --> */}
                            <div className="flex flex-col items-center w-full md:items-start">
                                <div className="mb-5 font-bold text-white">Customer Support</div>
                                <div className="flex flex-col space-y-3 items-center md:items-start">
                                    <a href="#" className="text-slate-300 capitalize">Help center</a>
                                    <a href="#" className="text-slate-300 capitalize">video link</a>
                                    <a href="#" className="text-slate-300 capitalize">Complain</a>
                                </div>
                            </div>
                            {/* <!-- menu 3 --> */}
                            <div className="flex flex-col items-center w-full md:items-start">
                                <div className="mb-5 font-bold text-white">Company</div>
                                <div className="flex flex-col space-y-3 items-center md:items-start">
                                    <a href="#" className="text-slate-300 capitalize">about</a>
                                    <a href="#" className="text-slate-300 capitalize">our team</a>
                                    <a href="#" className="text-slate-300 capitalize">carrer</a>
                                    <a href="#" className="text-slate-300 capitalize">contact</a>
                                </div>
                            </div>

                        </div>

                        {/* <!-- social links container --> */}
                        <div className="flex space-x-6 text-white">
                            <a href="#">
                                <img src={twitter} alt="" />
                            </a>
                            <a href="#">
                                <img src={facebook} alt="" />
                            </a>
                            <a href="#">
                                <img src={pinterest} alt="" />
                            </a>
                            <a href="#">
                                <img src={instagram} alt="" />
                            </a>
                        </div>
                    </div>
                </footer>
            </section>
        </>
    )
}

export default Home