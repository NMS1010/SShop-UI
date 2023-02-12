const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token && token.length > 100) return 'Bearer ' + token;
    return 'Bearer ';
};
export default authHeader;
