export const validateProductdata = (data) => {

    let result = true;
    let message = ''
    
    if(data.productName.trim() ==='' || data.description.trim() === '' || data.selectedSubCategory === '' || !data.ram === '') {
        result = false;
        message = 'Invalid Entries'
    }

    if(data.stock <= 0 || data.stock >= 100) {
        result = false;
        message = 'Invalid stock Entry'
    }

    if(parseInt(data.price) <= 0) {
        result = false;
        message = 'Invalid Price Entry'
    }

    return {
        result , message
    }
}