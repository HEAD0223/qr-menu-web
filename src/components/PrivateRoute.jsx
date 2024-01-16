import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({ auth: { isAuth }, children }) => {
	return isAuth ? children : <Navigate to="/login" />;
};

export const PrivateWrapper = ({ auth: { isAuth } }) => {
	return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
