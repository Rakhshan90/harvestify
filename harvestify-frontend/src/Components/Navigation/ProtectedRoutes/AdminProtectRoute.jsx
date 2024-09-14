import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const AdminProtectRoute = ({children}) => {
    // select loggedIn user from users reducer of redux store
    const user = useSelector(store => store?.users);
    const{userAuth} = user;
    if(userAuth?.isAdmin) return children;
    else if(userAuth) return <Navigate to='/' />;
    else return <Navigate to='/login' />;
}

export default AdminProtectRoute