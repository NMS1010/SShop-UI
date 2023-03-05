import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/features/auth/authSlice';

const PrivateRoute = ({ children, roles, loginComponent }) => {
    const dispatch = useDispatch();
    let { currentUser } = useSelector((state) => state?.auth);
    useEffect(() => {
        if (!currentUser) {
            (async () => {
                await dispatch(getCurrentUser());
            })();
        }
    }, []);
    if (!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')) return loginComponent;

    const res = currentUser?.roles.filter((role) => roles.includes(role?.roleName.toLowerCase()));
    if (!currentUser || !res || res.length === 0) {
        return loginComponent;
    }

    return children;
};

export default PrivateRoute;
