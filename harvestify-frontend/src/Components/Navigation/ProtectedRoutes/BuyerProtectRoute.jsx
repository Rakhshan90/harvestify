import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const BuyerProtectRoute = () => {
    const user = useSelector(store => store?.users);
    const { userAuth } = user;
    if (userAuth?.user_type === 'Buyer' || userAuth?.user_type === 'Admin') return children;
    else return <Navigate to='/' />
}

export default BuyerProtectRoute