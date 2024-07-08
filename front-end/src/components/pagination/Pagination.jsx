import React from 'react'

const Pagination = ({currentPage , totalPage , onPagechange}) => {

    const handlePrevPage = () => {
        if(currentPage > 1) {
            onPagechange(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if(currentPage < totalPage) {
            onPagechange(currentPage + 1);
        }
    }

    return (
        <div className='flex justify-center items-center space-x-2 mt-4'>
            <button disabled={currentPage === 1}
            onClick={handlePrevPage}
            className='px-3 py-1 mx-1 rounded-full bg-white text-amber-500 hover:bg-amber-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'>
                Prev
            </button>
            <div className='flex space-x-1'>
                {currentPage} / {totalPage}
            </div>

            <button disabled={currentPage === totalPage}
            onClick={handleNextPage}
            className='px-3 py-1 mx-1 rounded-full bg-white text-amber-500 hover:bg-amber-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'>
                Next
            </button>
        </div>
    )
}

export default Pagination