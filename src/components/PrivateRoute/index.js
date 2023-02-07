const PrivateRoute = ({ children, roles }) => {
    let isAuthenticated = localStorage.getItem('jwt_token');
    if (!isAuthenticated) return <h1>Must login</h1>;

    return children;
};

export default PrivateRoute;
