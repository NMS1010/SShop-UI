import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, roles, loginComponent }) => {
    const currentUser = useSelector((state) => state?.authReducer?.currentUser);
    if (!currentUser) {
        return loginComponent;
    }

    return children;
};

export default PrivateRoute;
