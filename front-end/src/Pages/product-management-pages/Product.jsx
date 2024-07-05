import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Button from '../../components/buttons/Button'

const Product = () => {
    return (
        <>
            <Navbar/>
            <div className='p-6 flex flex-col items-center justify-center my-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 '>
                        <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg" alt="img" className='w-full h-full object-cover rounded row-span-2 md:col-span-2'/>
                        <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg" alt="img" className='w-full h-full object-cover rounded'/>
                        <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg" alt="img" className='w-full h-full object-cover rounded'/>
                    </div>
                    <div className='flex flex-col space-y-4 p-4 bg-gray-100 rounded'>
                        <h2 className='text-xl font-bold'>bffsb</h2>
                        <p className='text-2xl text-red-500'>fdbdbdd</p>
                        <div className='flex space-x-2'>
                            <Button buttonText={'Edit Product'}/>
                            <Button buttonText={'Buy Now'}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product