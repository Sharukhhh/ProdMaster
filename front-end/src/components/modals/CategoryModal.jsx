import React, { useState } from 'react'
import { useAddMainCategoryMutation, useAddSubCategoryMutation } from '../../Redux/services/apiSlice';
import { errorAlert } from '../../utils/alerts';
import {toast} from 'react-hot-toast'
import ProgressLoader from '../loaders/ProgressLoader';
import ModalWrapper from '../wrappers/ModalWrapper';

const CategoryModal = ({isSubCategory , title , onClose, categories}) => {

    const [mainCategory , setMainCategory] = useState('')
    const [selectedMainCategory , setSelectedMainCategory] = useState('');
    const [subCategory , setSubCategory] = useState('');
    const [addMainCategory , {isLoading}] = useAddMainCategoryMutation();
    const [addSubCategory , {isLoading : isProcessing}] = useAddSubCategoryMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response ;
            if(!isSubCategory) {
                if(mainCategory.trim() === '') {
                    errorAlert('Invalid entry');
                    return;
                }
                response = await addMainCategory({mainCategory}).unwrap();
            } else {
                if(subCategory.trim() === '' || selectedMainCategory === '') {
                    errorAlert('Invalid entry');
                    return;
                }
                response = await addSubCategory({subCategory , selectedMainCategory}).unwrap();
            }
            toast.success(response?.message)
            onClose();
        } catch (error) {
            if(error?.data?.error) {
                errorAlert(error?.data?.error)
            } else {
                errorAlert(error?.statusText || error?.error || error);
            }
        } 
    }

    return (
        <>
        <ModalWrapper>
            <div className='flex justify-center items-center mb-4'>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>

            <form onSubmit={handleSubmit} >
                {isSubCategory && (
                    <>
                        <div className='mb-4'>
                            <select name="mainCategory" id="maincategory"
                                value={selectedMainCategory} onChange={(e) => setSelectedMainCategory(e.target.value)}
                                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm
                                    ocus:ring-indigo-500 focus:border-indigo-500 p-2 sm:text-sm'>
                                        <option value="">Select Main Category</option>
                                        {categories?.map((category) => (
                                            <option key={category?._id} value={category?._id}>
                                                {category?.mainCategory}
                                            </option>
                                        ))}
                            </select>
                        </div>
                    </> 
                )}       

                <div className='mb-4'>
                    <input type="text" 
                    name={isSubCategory ? 'subCategoryName' : 'mainCategory'} 
                    onChange={
                    isSubCategory ? (e) => setSubCategory(e.target.value) 
                    : (e) => setMainCategory(e.target.value)
                    }
                    value={isSubCategory ? subCategory : mainCategory}
                    placeholder={isSubCategory ? 'Add Sub Category' : 'Add Category'}
                    className='mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm'/>
                </div>

                <div className='flex justify-center'>
                    {isLoading || isProcessing ? (
                        <>
                            <ProgressLoader/>
                        </>
                    ) : (
                        <>
                            <button type='submit'
                            className='inline-flex justify-center px-4 py-2 mr-3 text-sm font-medium text-white rounded-md
                            bg-amber-500 border border-transparent rounded-mdfocus:outline-none focus:ring-2 focus:ring-offset-2'>
                                SAVE
                            </button>

                            <button type='button' onClick={onClose}
                            className='inline-flex justify-center px-4 py-2 text-sm font-medium text-black rounded-md
                            bg-neutral-100 border-black border-transparent rounded-mdfocus:outline-none focus:ring-2 focus:ring-offset-2'>
                                DISCARD
                            </button>
                        </>
                    )}
                </div>
            </form>
        </ModalWrapper>
        </>
    )
}

export default CategoryModal