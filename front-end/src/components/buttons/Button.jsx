import React from 'react'

const Button = ({buttonText }) => {
    return (
        <>
            <button className='bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 focus:outline-none'>
                {buttonText}
            </button>
        </>
    )
}

export default Button