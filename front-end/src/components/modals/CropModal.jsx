import React, { useCallback, useState } from 'react'
import ModalWrapper from '../wrappers/ModalWrapper'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '../../utils/cropImage';
import { errorAlert } from '../../utils/alerts';
import ProgressLoader from '../loaders/ProgressLoader';

const CropModal = ({image , onSave, onClose}) => {

    const [crop , setCrop] = useState({x: 0, y: 0});
    const [zoom , setZoom] = useState(1);
    const [croppedArea , setCroppedArea] = useState(null);
    const [isCropping , setIsCropping] = useState(false);

    const onCropComplete = useCallback((croppedArea , croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        try {
            setIsCropping(true);
            const croppedImage = await getCroppedImg({imageSrc: image , pixelCrop: croppedArea});
            console.log(croppedImage);
            onSave(croppedImage);
            onClose()
        } catch (error) {
            console.log(error);
            errorAlert(error);
        } finally {
            setIsCropping(false);
        }
    };

    return (
        <>
            <ModalWrapper>
                <h2 className='text-2xl font-bold mb-6'>Crop Image</h2>
                <div className='relative w-full h-64'>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>
                <div className='flex justify-center space-x-2 mt-4'>
                    {isCropping ? (
                        <>
                            <ProgressLoader/>
                        </>
                    ) : (
                    <>
                        <button onClick={handleSave} className='px-4 py-2 bg-amber-500 text-white rounded-md'>
                            Save
                        </button>
                        <button onClick={onClose} className='px-4 py-2 bg-neutral-100 text-black rounded-md'>
                            Discard
                        </button>
                    </>
                    )}
                </div>
            </ModalWrapper>
        </>
    )
}

export default CropModal