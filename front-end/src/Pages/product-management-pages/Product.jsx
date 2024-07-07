import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Button from '../../components/buttons/Button'
import { useParams } from 'react-router-dom'
import { useGetSingleProductQuery, useGetSubCategoriesQuery } from '../../Redux/services/apiSlice'
import RotateLoader from '../../components/loaders/RotateLoader'
import { infoAlert } from '../../utils/alerts'
import ProductModal from '../../components/modals/ProductModal'

const Product = () => {
    const {id} = useParams();
    const {data , isLoading , isFetching , isError} = useGetSingleProductQuery(id)
    const {data: subCategoriesData } = useGetSubCategoriesQuery()
    const [editModalOpen , setEditModalOpen] = useState(false);
    const [quantity , setQuantity] = useState(1);

    const handleIncrement = (stock) => {
        if(quantity > parseInt(stock)) {
            infoAlert('Out Of stock!');
            return;
        }
        setQuantity(prev => prev + 1);
    }
    const handleDecrement = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity(prev => prev - 1);
    }

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    }

    return (
        <>
            <Navbar/>
            <div className='p-6 flex flex-col items-center justify-center my-6'>
                {isLoading || isFetching ? (
                    <>
                        <RotateLoader/>
                    </>
                ) : isError ? (
                    <div className='my-4'>
                        <p className='text-3xl text-red-500'>Error While Fetching product,try later</p>
                    </div>
                ) : (          
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl'>
                        {data?.product?.map((item) => (
                        <React.Fragment key={item?._id}>
                            <div  className='grid grid-cols-1 gap-4  md:grid-cols-2 md:grid-rows-2 '>
                                <img src={item?.images[2]} alt={item?.productName} className='w-full h-full object-cover rounded row-span-2 md:col-span-2'/>
                                <img src={item?.images[1]} alt={item?.productName} className='w-full h-full object-cover rounded'/>
                                <img src={item?.images[0]} alt={item?.productName} className='w-full h-full object-cover rounded'/>
                            </div>
                            <div className='flex flex-col space-y-4 p-4 rounded'>
                                <h2 className='text-3xl font-bold truncate'>{item?.productName}</h2>
                                <p className='text-xl text-black font-bold'>Rs: {item?.price}</p>
                                <p className='text-xl text-gray-700'>
                                    {item?.description}
                                </p>
                                <p className='text-black font-bold'>
                                    RAM: 
                                    <span className='bg-gray-200 ml-2 p-2 '>{item?.ram} GB</span>
                                </p>
                                <hr />
                                <p className='font-semibold mt-2'>
                                    <span className=' text-green-500'>In stock</span>
                                </p>
                                <div className='flex items-center space-x-2'>
                                    <button onClick={handleDecrement} className='px-2 py-1 bg-gray-200 rounded'>
                                        -
                                    </button>
                                    <span className='px-4 py-2 border'>{quantity}</span>
                                    <button onClick={() => handleIncrement(item?.stock)} className='px-2 py-1 bg-gray-200 rounded'>
                                        +
                                    </button>
                                </div>
                                <div className='flex space-x-2'>
                                    <Button onClickHandle={toggleEditModal} buttonText={'Edit Product'}/>
                                    <Button buttonText={'Buy Now'}/>
                                </div>
                            </div>
                        </React.Fragment>
                        ))}
                    </div>
                )}
            </div>

            {editModalOpen && (
                <ProductModal 
                onClose={toggleEditModal}
                subcategories={subCategoriesData?.subcategories}
                isEditMode={true}
                productId={id}
                />
            )}
        </>
    )
}

export default Product