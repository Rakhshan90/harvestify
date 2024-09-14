import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateProtectRoute = ({children}) => {
    // select loggedIn user form users reduces of redux store
    const user = useSelector(store => store?.users);
    const {userAuth} = user;
    if(userAuth) return children;
    else return <Navigate to='/login' />
}

export default PrivateProtectRoute