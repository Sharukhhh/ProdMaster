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

export const infoAlert = (message) => {
    Swal.fire({
        icon: 'info',
        title: message
    })
}