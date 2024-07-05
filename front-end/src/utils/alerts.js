import Swal from 'sweetalert2';


export const errorAlert = (message) => {
    Swal.fire({
        icon: 'error',
        title: message,
    })
}

export const successAlert = (message) => {
    Swal.fire({
        title: message,
        icon: 'success',
    })
}