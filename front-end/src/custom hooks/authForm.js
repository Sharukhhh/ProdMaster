import { useState } from "react"

export const useAuthFormHook = () => {

    const [authFormData , setAuthFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleDataChange  = (e) => {
        const {name , value} = e.target;
        setAuthFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return  {
        authFormData , handleDataChange
    }
}