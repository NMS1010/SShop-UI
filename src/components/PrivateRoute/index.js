import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/features/auth/authSlice';
import config from '../../configs';
import { Navigate } from 'react-router-dom';
import * as authUtils from '../../utils/authUtils';
const PrivateRoute = ({ children, roles }) => {
    const dispatch = useDispatch();
    let { currentUser } = useSelector((state) => state?.auth);

    if (!authUtils.isTokenStoraged()) {
        return <Navigate to={config.routes.auth} replace />;
    }
    if (!currentUser) {
        dispatch(getCurrentUser());
        return;
    }
    if (roles.includes('admin')) {
        const res = currentUser.roles.some((role) => role?.roleName === 'Admin');
        if (!res) {
            return <Navigate to={config.routes.forbidden} replace />;
        }
    }
    return children;
};

export default PrivateRoute;
