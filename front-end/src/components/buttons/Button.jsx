import React from 'react'

const Button = ({buttonText , onClickHandle }) => {
    return (
        <>
            <button onClick={onClickHandle} className='bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 focus:outline-none'>
                {buttonText}
            </button>
        </>
    )
}

export default Button