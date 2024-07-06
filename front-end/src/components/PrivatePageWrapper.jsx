import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet , Navigate} from 'react-router-dom'

const PrivatePageWrapper = () => {
    const storedUserInfo = useSelector((state) => state.prodMaster_auth.endUserInfo);

    if(storedUserInfo) {
        return <Outlet/>
    } else {
        return <Navigate to={'/login'} replace/>
    }
}

export default PrivatePageWrapper