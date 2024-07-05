import React from 'react'

const Sidebar = ({onClose , isOpen}) => {
    return (
        <>
            <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='p-4 flex justify-between items-center'>
                    <h2 className='text-2xl font-bold'></h2>
                    <button onClick={onClose} className='text-2xl font-bold'>X</button>
                </div>
                <div className='p-4'>
                    
                </div>
            </div>
        </>
    )
}

export default Sidebar