import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import Sidebar from '../sidebar/Sidebar';
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [sideBarOpen , setSideBarOpen] = useState(false);
    const navigate = useNavigate();
    const toggleSidebar = () => {
        setSideBarOpen(!sideBarOpen);
    }

    const handleLogout = () => {
        navigate('/login');
    }

    return (
        <>
            <nav className='bg-gray-800 p-6 flex items-center justify-between'>
                <div className='flex items-center w-full md:w-auto'>
                    <input type="search" 
                    placeholder='Search anything.......'
                    className='p-2 rounded-l-md focus:outline-none w-full md:w-auto'
                    />
                    <button className='bg-amber-500 text-white p-2 rounded-r-md hover:bg-amber-700 focus:outline-none'>
                        Search
                    </button>
                </div>
                <div className='flex items-center space-x-8 ml-4 md:ml-0'>
                    <FaRegHeart onClick={toggleSidebar} title='Wishlist' className='text-white text-2xl hover:text-amber-500 cursor-pointer'/>
                    <IoMdLogOut onClick={handleLogout} title='Logout' className='text-white text-2xl hover:text-amber-500 cursor-pointer'/>
                </div>
            </nav>
            <Sidebar isOpen={sideBarOpen} onClose={toggleSidebar} />
        </>
    )
}

export default Navbar