import React from 'react'

const InputField = ({type , placeholder, name , value , onChange}) => {
    return (
        <>
            <input 
            required
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className='w-full p-3 border mb-2 border-gray-300 rounded'
            />
        </>
    )
}

export default InputField