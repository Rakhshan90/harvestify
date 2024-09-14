import React, { useState } from 'react'
import darkMode from '../dark_mode.png'
import lightMode from '../light_mode.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../../redux/slices/users/usersSlices';
import MyMenu from '../../util/MyMenu';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [themeIcon, setThemeIcon] = useState(false);
    const toggleEvent = () => {
        setIsOpen(!isOpen);
    }
    const toggleTheme = () => {
        setThemeIcon(!themeIcon);
        document.documentElement.classList.toggle('dark');
    }
    const dispatch = useDispatch();
    const user = useSelector(store => store?.users);
    const { userAuth, appErr, serverErr, loading } = user;
    return (
        <nav className="relative max-w-screen mx-auto p-6 dark:bg-slate-800 dark:text-white">
            {/* flex container */}
            <div className="w-full flex items-center justify-between">
                {/* container for all items */}
                <div className="w-2/3 flex items-center justify-between">
                    {/* logo */}
                    <h1 className="font-bold text-black dark:text-white text-4xl">Harvestify</h1>
                    {/* container for menu items */}
                    <div className="hidden lg:flex space-x-8 font-bold">
                        <Link to='/' className="text-grayishBlue hover:text-teal-500">Home</Link>
                        <Link to='/products' className="text-grayishBlue hover:text-teal-500">Products</Link>
                        <Link to='/create-product' className="text-grayishBlue hover:text-teal-500">Create-Product</Link>
                        <Link to='/auctions' className="text-grayishBlue hover:text-teal-500">Auctions</Link>
                        <Link to='/users' className="text-grayishBlue hover:text-teal-500">
                            Users
                        </Link>
                    </div>
                </div>
                {/* container for login/signup, menu and dark/light mode switch */}
                <div className="hidden lg:flex space-x-6 items-center font-bold">
                    {/* dark mode toggle switch */}
                    <div onClick={toggleTheme} className='cursor-pointer'>
                        {themeIcon ? <img src={lightMode} className='invert' alt="" /> :
                            <img src={darkMode} alt="" />}
                    </div>

                    {/* Menu */}
                    <MyMenu />

                    {/* login and sign up */}
                    {!userAuth ? (
                        <Link to='/login' className="text-grayishBlue hover:text-teal-500">
                            Login
                        </Link>
                    ) : null}
                    {userAuth ? (
                        <button onClick={() => dispatch(userLogoutAction())}
                            className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:opacity-70">
                            Logout
                        </button>
                    ) : (
                        <Link to='/register' className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:opacity-70">
                            Sign up
                        </Link>
                    )}
                </div>

                {/* theme toggle, profile menu, and hamburger button container */}
                <div className='flex items-center space-x-4 lg:hidden'>
                    {/* dark mode toggle switch */}
                    <div onClick={toggleTheme} className='cursor-pointer lg:hidden'>
                        {themeIcon ? <img src={lightMode} className='invert' alt="" /> :
                            <img src={darkMode} alt="" />}
                    </div>

                    {/* menu */}
                    <MyMenu />

                    <button onClick={toggleEvent} id="menu-btn" type="button" className={
                        `block hamburger lg:hidden focus:outline-none ${isOpen ? 'open' : ''}`
                    }>
                        <span className="hamburger-top bg-slate-900 dark:bg-white"></span>
                        <span className="hamburger-middle bg-slate-900 dark:bg-white"></span>
                        <span className="hamburger-down bg-slate-900 dark:bg-white"></span>
                    </button>
                </div>
            </div>

            {/* mobile menu  */}
            <div id="menu" className={`absolute lg:hidden ${isOpen ? 'flex' : 'hidden'} z-50 left-6 right-6 top-40 p-6 
    rounded-lg bg-slate-700`}>
                <div className="flex flex-col space-y-6 justify-center items-center font-bold text-white w-full">
                    <Link to='/' className="w-full text-center">Home</Link>
                    <Link to='/products' className="w-full text-center">Products</Link>
                    <Link to='/create-product' className="w-full text-center">Create-Product</Link>
                    <Link to='/auctions' className="w-full text-center">Auctions</Link>
                    <Link to='/users' className="w-full text-center">Users</Link>
                    {!userAuth ? (
                        <Link to='/login' className="w-full pt-6 border-t border-slate-400 text-center">
                            Login
                        </Link>
                    ) : null}
                    {userAuth ? (
                        <button onClick={()=> dispatch(userLogoutAction())}  
                        className="bg-teal-500 py-3 px-8 rounded-full text-center">
                            Logout
                        </button>
                    ) : (
                        <Link to='/register' className="bg-teal-500 py-3 px-8 rounded-full text-center">
                            Sign up
                        </Link>
                    )}
                </div>
            </div>

        </nav>
    )
}

export default Navbar