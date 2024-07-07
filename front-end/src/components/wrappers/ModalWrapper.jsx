import React from 'react'

const ModalWrapper = ({children}) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden bg-opacity-50 backdrop-blur-sm overflow-y-auto'>
            <div className='relative mx-auto my-2 max-w-2xl w-full p-4'>
                <div className='bg-neutral-50 p-10 rounded shadow-xl border-black border'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalWrapper