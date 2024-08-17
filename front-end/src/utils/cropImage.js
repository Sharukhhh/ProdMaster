

export const getCroppedImg = ({imageSrc, pixelCrop}) => {

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve, reject) => {
        image.onload = () => {
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            context.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );
            canvas.toBlob(blob => {
                if(blob){
                    resolve(blob);
                } else {
                    reject(new Error('Canvas is empty'));
                }
            } , 'image/jpeg');
        };

        image.onerror = error => {
            console.log(error);
            reject(error)
        }
    })
}