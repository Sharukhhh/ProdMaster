import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Button from '../../components/buttons/Button'
import {Link} from 'react-router-dom'
import { useGetAllProductsQuery, useGetCategoriesQuery, useGetSubCategoriesQuery } from '../../Redux/services/apiSlice'
import CategoryModal from '../../components/modals/CategoryModal'
import ProductModal from '../../components/modals/ProductModal'
import RotateLoader from '../../components/loaders/RotateLoader'
import { IoIosHeartEmpty, IoMdHeart , IoIosStarOutline} from "react-icons/io";

const Home = () => {
    
    const [openMainCategoryModal , setOpenMainCategoryModal] = useState(false);
    const [openSubCategoryModal , setOpenSubCategoryModal] = useState(false);
    const [openAddProductModal , setOpenAddProductModal] = useState(false);
    const [selectedSubCategory , setSelectedSubCategory] = useState([]);
    const {data} = useGetCategoriesQuery();
    const {data: subCategoriesData } = useGetSubCategoriesQuery();
    const {data: productData , isLoading, isFetching , isError} = useGetAllProductsQuery()

    // Main Category modal display handler
    const handleMainCategoryModalDisplay = () => {
        setOpenMainCategoryModal(!openMainCategoryModal);
    }

    // Sub category modal display handler
    const handleSubCategoryModalDisplay = () => {
        setOpenSubCategoryModal(!openSubCategoryModal);
    }

    // Add / Edit Product modal display handler
    const handleAddProductModalDisplay = () => {
        setOpenAddProductModal(!openAddProductModal);
    }

    //to add and filter out selected sub category id
    const handleSubCategoryChange = (subCategoryId) => {
        if(selectedSubCategory.includes(subCategoryId)){
            setSelectedSubCategory((prev) => prev.filter((id) => id !== subCategoryId));
            } else {
            setSelectedSubCategory(prev => [...prev , subCategoryId]);
        }
    }

    return (
        <>
            <Navbar/>
            <div className='flex justify-center sm:justify-end p-4 my-4'>
                <div className='space-x-3 space-y-3'>
                    <Button onClickHandle={handleMainCategoryModalDisplay} buttonText={'Add Category'}/>
                    <Button onClickHandle={handleSubCategoryModalDisplay} buttonText={'Add Sub category'}/>
                    <Button onClickHandle={handleAddProductModalDisplay} buttonText={'Add Product'}/>
                </div>
            </div>
            <div className='container mx-auto mt-8 flex flex-col md:flex-row items-stretch'>
                <div className='w-full md:w-1/3 md:pr-3 md:mb-2 md:text-left'>
                    <div className='bg-white p-4 rounded-md mb-4'>
                        <h2 className='text-lg font-bold'>Categories</h2>
                        <p className='text-gray-500 mb-2'>All Categories</p>
                        <ul>
                        {data?.categories?.map((mainCategory) => (
                            <li key={mainCategory?._id} className='cursor-pointer hover:underline'>
                            {mainCategory?.mainCategory}
                            <ul className='ml-4'>
                                {subCategoriesData?.subcategories?.filter((subCategory) => subCategory?.mainCategory === mainCategory?._id)
                                .map((subCategory) => (
                                <li key={subCategory?._id}>
                                    <input
                                    onChange={() => handleSubCategoryChange(subCategory?._id)}
                                    checked={selectedSubCategory.includes(subCategory?._id)}
                                    type="checkbox" 
                                    /> {subCategory?.subcategoryName}
                                </li>
                                ))}  
                            </ul>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className='w-full md:w-2/3'>
                    {isLoading || isFetching ? (
                        <RotateLoader/>
                    ) : isError ? ( 
                        <>
                            <p className='text-red-500'>Error Loading Products!</p>
                        </>
                    ) : (
                        <div className='flex flex-wrap'>
                            {productData?.products?.
                            filter(product => {
                            if(selectedSubCategory.length === 0){
                                return true;
                            }
                            return selectedSubCategory.some(subId => product.subCategory.includes(subId))
                            })?.map((product) => (
                            <div key={product?._id} className='w-full md:w-1/2 lg:w-1/3 p-2' title='view product'>
                                <Link to={`/product/${product?._id}`}>
                                    <div className='bg-slate-50 border rounded-lg overflow-hidden p-6 space-y-5'>
                                        {product?.images?.length > 0 ? (
                                            <img src={product?.images[2]} alt={product?.productName}
                                            className='h-40 w-full object-cover mb-2'/>
                                        ) : (
                                            <img src={'https://orionsoftsol.com/wp-content/plugins/woocommerce/assets/images/placeholder.png'} alt="product img" 
                                            className='h-40 w-full object-cover mb-2'/>
                                        )}
                                        <div className='flex justify-between items-center'>
                                            <p className='text-xl font-bold mb-1 truncate'>{product?.productName}</p>
                                            <IoIosHeartEmpty size={16} />
                                        </div>
                                        <p className='text-gray-500 text-xl truncate'>Rs: {product?.price}</p>
                                        <div className='flex'>
                                            {Array.from({length: 4}).map((_ , index) => (
                                                <IoIosStarOutline key={index} size={17} />
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            ))}
                        </div>
                    )}    
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

            {openAddProductModal && (
                <ProductModal
                onClose={handleAddProductModalDisplay}
                subcategories={subCategoriesData?.subcategories}
                isEditMode={false}
                />
            )}
        </>
    )
}

export default Home