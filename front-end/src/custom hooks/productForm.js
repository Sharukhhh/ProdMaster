import { useEffect, useState } from "react"


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

    const [cropModalOpen , setCropModalOpen] = useState(false);
    const [selectedImg , setSelectedImg] = useState(null);
    const [objectURls , setObjectURLs] = useState([]);

    const handleDataChange  = (e) => {
        const {name , value} = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    useEffect(() => {
        return () => {
            objectURls.forEach(URL.revokeObjectURL)
        }
    }, [objectURls]);


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if(imageFiles.length > 0) {
            setSelectedImg(URL.createObjectURL(imageFiles[0]));
            setCropModalOpen(true);
        }
    }


    const handleCropSave = (croppedBlob) => {
        const croppedImageURl = URL.createObjectURL(croppedBlob);
        setObjectURLs(prev => [...prev, croppedImageURl])
        setProductData(prev => ({
            ...prev,
            images: [...prev.images, croppedImageURl]
        }));
    }

    const removeImage = (index) => {
        const newImages = productData.images.filter((_, i) => i !== index);
        URL.revokeObjectURL(productData.images[index]);
        setProductData(prev => ({
            ...prev,
            images: newImages
        }));
    }

    return {
        productData, handleDataChange, handleFileChange, removeImage, setProductData,
        handleCropSave, setCropModalOpen , selectedImg , cropModalOpen 
    }

}