
export const validateAuthFormData = (data) => {

    if(data.name.trim() === '' || data.email.trim() === '' || data.password.trim() === '') {
        return false;
    }

    if(data.name.trim().length <= 4) {
        return false;
    }

    return true;
}