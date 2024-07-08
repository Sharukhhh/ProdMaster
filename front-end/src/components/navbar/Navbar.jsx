import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import Sidebar from '../sidebar/Sidebar';
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUserDetailsFromStore } from '../../Redux/slices/authSlice';
import { successAlert } from '../../utils/alerts';

const Navbar = () => {
    const [sideBarOpen , setSideBarOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toggleSidebar = () => {
        setSideBarOpen(!sideBarOpen);
    }

    const handleLogout = () => {
        dispatch(removeUserDetailsFromStore());
        successAlert('Logged out successfully');
        navigate('/login');
    }

    return (
        <>
            <nav className='bg-[#001f3f] p-6 flex items-center justify-around'>
                <div className='flex items-center w-full md:w-auto'>
                    <input type="search" 
                    placeholder='Search anything.......'
                    className='p-3 rounded-l-md focus:outline-none w-full md:w-auto shadow-md'
                    />
                    <button className='bg-amber-500 shadow-md text-white p-3 rounded-r-md hover:bg-amber-700 focus:outline-none'>
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