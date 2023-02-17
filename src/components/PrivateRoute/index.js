import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, roles, loginComponent }) => {
    const currentUser = useSelector((state) => state?.authReducer?.currentUser);
    const res = currentUser?.roles.filter((role) => roles.includes(role?.roleName.toLowerCase()));
    if (!currentUser || !res || res.length === 0) {
        return loginComponent;
    }

    return children;
};

export default PrivateRoute;
