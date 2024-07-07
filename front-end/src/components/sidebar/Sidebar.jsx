import React from 'react'

const Sidebar = ({onClose , isOpen}) => {
    return (
        <>
            <div className={`fixed top-0 right-0 h-full w-64 md:w-80 bg-white shadow-md text-black transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='p-4 flex justify-between items-center'>
                    <h2 className='text-xxl font-semibold'>My Wishlist</h2>
                    <button onClick={onClose} className='text-2xl font-bold'>X</button>
                </div>
                <div className='p-4'>
                    <div className='flex items-center space-x-4'>
                        <img src='...' alt='Product' className='w-16 h-16 md:w-20 md:h-20 object-cover rounded' />
                        <div className='flex-1'>
                            <p className='text-lg md:text-xl font-semibold'>Product Name</p>
                            {/* Additional product details */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar