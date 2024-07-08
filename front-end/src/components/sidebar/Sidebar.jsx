import React from 'react'
import { useGetWishlistItemsQuery } from '../../Redux/services/apiSlice'

const Sidebar = ({onClose , isOpen}) => {
    const {data , isError , isFetching , isLoading} = useGetWishlistItemsQuery();

    return (
        <>
            <div className={`fixed top-0 right-0 h-full w-64 md:w-80 bg-white shadow-md text-black transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='p-4 flex justify-between items-center'>
                    <h2 className='text-xxl font-semibold'>My Wishlist</h2>
                    <button onClick={onClose} className='text-2xl font-bold'>X</button>
                </div>
                <hr />
                {isFetching || isLoading ? (
                    <div className='my-3 bg-slate-50 font-mono text-center p-2'>
                        Loading............
                    </div>
                ) : isError ? (
                    <div className='my-3 bg-slate-100 p-2'>
                        <span className='text-red-500'>Error While Fetching items</span>
                    </div>
                ) : (
                    <div className='p-4'>
                        {data?.products?.products?.map((item) => (
                            <div key={item?._id} className='flex items-center space-x-4 border border-gray-200 rounded-md p-3 mb-2 shadow-md'>
                                <img src={item?.itemId?.images[2]} alt={item?.itemId?.productName} className='w-16 h-16 md:w-20 md:h-20 object-cover rounded' />
                                <div className='flex-1 space-y-4'>
                                    <p className='font-semibold truncate'>{item?.itemId?.productName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Sidebar