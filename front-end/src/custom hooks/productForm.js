import { useState } from "react"


export const useProductForm = () => {
    
    const [productData , setProductData] = useState({
        productName: '',
        description: '',
        price:'',
        stock: 0,
        ram: '',
        selectedSubCategory: '',
        images:[]
    });

    const handleDataChange  = (e) => {
        const {name , value} = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        setProductData(prev => ({
            ...prev,
            images: [...prev.images, ...imageFiles]
        }));
    }

    const removeImage = (index) => {
        setProductData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    }

    return {
        productData, handleDataChange, handleFileChange, removeImage, setProductData
    }

}