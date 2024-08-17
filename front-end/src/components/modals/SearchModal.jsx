import React, { useEffect, useState } from 'react'
import ModalWrapper from '../wrappers/ModalWrapper'
import { ImCancelCircle } from "react-icons/im";
import { useSearchItemsQuery } from '../../Redux/services/apiSlice';
import { throttle } from '../../utils/throttle';
import RotateLoader from '../loaders/RotateLoader';


const SearchModal = ({closeModal}) => {
    const [searchQuery , setSetSearchQuery] = useState('');
    const [triggerSearch , setTriggerSearch] = useState(false);
    const {data , isLoading , isFetching , isSuccess, isError} = useSearchItemsQuery(searchQuery, {
        skip: triggerSearch === false
    })

    console.log(data, 'searhc dta');

    const handleSearchQueryOnChange = (e) => {
        setSetSearchQuery(e.target.value);
        setTriggerSearch(true);
    }

    useEffect(() => {
        const throttledSearch = throttle(() => setTriggerSearch(true), 3000);
        throttledSearch();
    },[searchQuery]);

    useEffect(() => {
        if(!isLoading || !isFetching) {
            setTriggerSearch(false);
        }
    },[isSuccess]);

    return (
        <>
            <ModalWrapper>
                <div className='p-2 flex justify-between'>
                    <input type="search" name="search" value={searchQuery} required
                    placeholder='Search......' onChange={handleSearchQueryOnChange}
                    className='p-3 border mb-2 border-gray-300 rounded-xl w-full mr-2 '
                    />
                    <span onClick={closeModal} title='Close' className='p-2'><ImCancelCircle size={24}/></span>
                </div>
                <hr />
                <div className='my-3 p-2'>
                    {isFetching || isLoading ? (
                        <div className='flex justify-center items-center p-1'>
                            <RotateLoader/>
                        </div>
                    ) : isError ?  (
                        <div className='mx-auto max-w-3xl p-2 flex justify-center items-center'>
                            <p className='text-red-500 font-semibold'>Trouble fetching data. Try again later</p>
                        </div>
                    ) : (
                        data?.data?.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {data?.data?.map((item) => (
                                <div key={item?._id} className='flex items-center p-4 border border-gray-300 rounded-lg'>
                                    <img src={item?.images[2]} alt={item?.productName} className='w-16 h-16 mr-4'/>
                                    <div className='flex - 1'>
                                        <h3 className='text-lg font-semibold truncate'>{item?.productName}</h3>
                                    </div>
                                </div>
                            ))}
                            </div>
                        ) : (
                            <div className='mx-auto max-w-3xl p-2 flex justify-center items-center'>
                                <p className='text-red-500 font-semibold'>No Data Found</p>
                            </div>
                        )
                    )}
                </div>
            </ModalWrapper>
        </>
    )
}

export default SearchModal