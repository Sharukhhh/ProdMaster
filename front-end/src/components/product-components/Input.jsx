import React from 'react'

const Input = ({label, isTextArealabel, ...props}) => {
    return (
        <div className='flex flex-col'>
            <label className='text-sm font-medium mb-1' htmlFor={label}>{label}</label>
            {!isTextArealabel ? (
                <input required
                {...props}
                className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                />
            ) :  (
                <textarea required name="" rows={3} {...props}
                className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none'
                />
            )}
        </div>
    )
}

export default Input