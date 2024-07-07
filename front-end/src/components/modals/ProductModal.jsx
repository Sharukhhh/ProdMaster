import React, { useEffect, useState } from 'react'
import ModalWrapper from '../wrappers/ModalWrapper'
import Input from '../product-components/Input'
import { useProductForm } from '../../custom hooks/productForm'
import ProgressLoader from '../loaders/ProgressLoader';
import {storage} from '../../firebase/firebase'
import {ref , uploadBytes , getDownloadURL} from 'firebase/storage'
import { validateProductdata } from '../../utils/validateProductData'
import { errorAlert } from '../../utils/alerts'
import { useEditProductMutation, useGetSingleProductQuery, useSaveProductMutation } from '../../Redux/services/apiSlice'
import {toast} from 'react-hot-toast'
import RotateLoader from '../loaders/RotateLoader';

const ProductModal = ({onClose, subcategories , isEditMode , productId}) => {
    const {productData , setProductData, handleDataChange , handleFileChange , removeImage} = useProductForm();
    const [saveProduct , {isLoading}] = useSaveProductMutation()
    const {data: editData , isLoading: isEditDataLoading} = useGetSingleProductQuery(productId , {skip: !isEditMode});
    const [editProduct , {isLoading: isUpdating}] = useEditProductMutation()
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if(isEditMode && editData) {
            setProductData({
                productName: editData?.product[0]?.productName,
                price: editData?.product[0]?.price,
                description: editData?.product[0]?.description,
                ram: editData?.product[0]?.ram,
                stock: editData?.product[0]?.stock,
                selectedSubCategory: editData?.product[0]?.subCategory?._id
            });
        }
    } , [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {result , message} = validateProductdata(productData);
        if(!result) {
            errorAlert(message);
            return;
        }
        try {
            let response;
            if(!isEditMode) {

                if(productData.images.length < 3) {
                    errorAlert('Atleast 3 images required');
                    return;
                }

                // firebase setup for storing seelcted images to the firebase
                setIsUploading(true);
                const imageUploadPromises = productData.images.map(async(image) => {
                    const imageRef = ref(storage , `product_images/${image.name}`);
                    await uploadBytes(imageRef , image);
                    return await getDownloadURL(imageRef);
                });
                const imageUrls = await Promise.all(imageUploadPromises);

                const updatedProductData = {...productData , images: imageUrls};
                response = await saveProduct(updatedProductData).unwrap();

            } else {
                response = await editProduct({productId , ...productData}).unwrap();
                console.log(response);
            }
            toast.success(response?.message);
            onClose();
        } catch (error) {
            if(error?.data?.error) {
                errorAlert(error?.data?.error)
            } else {
                errorAlert(error?.statusText || error?.error || error);
            }
        } finally {
            setIsUploading(false);
        }
    }


    return (
        <>
            <ModalWrapper>
                <h2 className='text-2xl font-bold mb-6'>
                    {isEditMode ? 'Update Product' : 'Add Product'}
                </h2>
                {isEditDataLoading ? (
                    <>
                        <RotateLoader/>
                    </>
                ) : (
                    <form onSubmit={handleSubmit} encType='multipart-formdata' className='space-y-4'>
                        <Input
                        isTextArealabel={false}
                        label={'Product Name'}
                        type={'text'}
                        name={'productName'}
                        value={productData.productName} onChange={handleDataChange}
                        />
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                            <Input
                            isTextArealabel={false}
                            label={'Price'}
                            type={'text'}
                            name={'price'}
                            value={productData.price} onChange={handleDataChange}
                            />
                            <div className='flex flex-col'>
                                <label htmlFor="ram" className='text-sm font-medium mb-1'>Ram Size</label>
                                <select
                                    name="ram" 
                                    value={productData.ram}
                                    onChange={handleDataChange}
                                    className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                                >
                                    <option value="">Select RAM Size</option>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="16">16</option>
                                    <option value="32">32</option>
                                </select>
                            </div>
                            <Input
                            isTextArealabel={false}
                            label={'Stock'}
                            type={'number'}
                            name={'stock'}
                            value={productData.stock} onChange={handleDataChange}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="Sub category" className='text-sm font-medium mb-1'>Sub Category</label>

                            <select value={productData.selectedSubCategory} onChange={handleDataChange} name="selectedSubCategory" 
                            className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500' >
                                <option value="">Select a sub category</option>
                                {subcategories?.map((sub) => (
                                    <option key={sub?._id} value={sub?._id}>{sub?.subcategoryName}</option>
                                ))}
                            </select>
                        </div>
                        <Input
                        isTextArealabel={true}
                        label={'About Product'}
                        type={'text'}
                        name={'description'}
                        value={productData.description} onChange={handleDataChange}
                        />
                        {!isEditMode && (
                        <>
                            <Input
                            isTextArealabel={false}
                            label={'Images'}
                            multiple
                            type={'file'}
                            name={'images'}
                            onChange={handleFileChange}
                            />
                            <div className='flex flex-wrap mt-4'>
                                {productData?.images?.map((image, index) => (
                                    <div key={index} className='relative m-2'>
                                        <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className='h-20 w-20 object-cover rounded-md' />
                                        <button
                                            type="button"
                                            className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                                            onClick={() => removeImage(index)}
                                            >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                        )}
                        <div className='flex justify-center'>
                            {isLoading || isUploading || isUpdating ? (
                                <>
                                    <ProgressLoader/>
                                </>
                            ) : (
                                <>
                                    <button type='submit'
                                    className='inline-flex justify-center px-4 py-2 mr-3 text-sm font-medium text-white rounded-md
                                    bg-amber-500 border border-transparent rounded-mdfocus:outline-none focus:ring-2 focus:ring-offset-2'>
                                        {isEditMode ? 'UPDATE' : 'SAVE'}
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
                )}
            </ModalWrapper>
        </>
    )
}

export default ProductModal