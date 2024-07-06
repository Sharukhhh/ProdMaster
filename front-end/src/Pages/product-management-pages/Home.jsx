import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Button from '../../components/buttons/Button'
import {Link} from 'react-router-dom'
import { useGetCategoriesQuery } from '../../Redux/services/apiSlice'
import CategoryModal from '../../components/modals/CategoryModal'

const Home = () => {
    
    const [openMainCategoryModal , setOpenMainCategoryModal] = useState(false);
    const [openSubCategoryModal , setOpenSubCategoryModal] = useState(false);
    const {data} = useGetCategoriesQuery();

    // Main Category modal display handler
    const handleMainCategoryModalDisplay = () => {
        setOpenMainCategoryModal(!openMainCategoryModal);
    }

    // Sub category modal display handler
    const handleSubCategoryModalDisplay = () => {
        setOpenSubCategoryModal(!openSubCategoryModal);
    }

    return (
        <>
            <Navbar/>
            <div className='flex justify-center sm:justify-end p-4 my-4'>
                <div className='space-x-3 space-y-3'>
                    <Button onClickHandle={handleMainCategoryModalDisplay} buttonText={'Add Category'}/>
                    <Button onClickHandle={handleSubCategoryModalDisplay} buttonText={'Add Sub category'}/>
                    <Button buttonText={'Add Product'}/>
                </div>
            </div>
            <div className='container mx-auto mt-8 flex flex-col md:flex-row items-stretch'>
                <div className='w-full md:w-1/3 md:pr-3 md:mb-2 md:text-left'>
                    <div className='bg-white p-4 rounded-md mb-4'>
                        <h2 className='text-lg font-bold'>Categories</h2>
                        <p className='text-gray-500 mb-2'>All Categories</p>
                        <ul>
                            <li className='cursor-pointer hover:underline'></li>
                            <ul>
                                <li>
                                    <input type="checkbox" />
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
                <div className='w-full md:w-2/3'>
                    <div className='flex flex-wrap'>
                        <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
                            <Link>
                                <div className='bg-white border rounded-lg overflow-hidden p-2'>
                                    <img src="" alt="" className='h-40 w-full object-cover mb-2'/>
                                    <p className='text-sm font-bold mb-1 truncate'>hih</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {openMainCategoryModal && (
                <CategoryModal
                isSubCategory={false}
                title={'Add Main Category'}
                onClose={handleMainCategoryModalDisplay}
                />
            )}

            {openSubCategoryModal && (
                <CategoryModal
                isSubCategory={true}
                title={'Add Sub category'}
                categories={data?.categories}
                onClose={handleSubCategoryModalDisplay}
                />
            )}
        </>
    )
}

export default Home