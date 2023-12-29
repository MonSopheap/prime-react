import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppProps } from './AppProps';

const ProtectedRoute = ({ children }) => {
    const accessToken = localStorage.getItem(AppProps.ACCESS_TOKEN);
    const currentUser = localStorage.getItem(AppProps.CURRENT_USER);
    if (!accessToken || accessToken === "" || !currentUser || currentUser == null) {
        return <Navigate to='auth/login' replace />;
    }
    return children;
};

export default ProtectedRoute;