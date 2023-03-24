import jwtDecode from 'jwt-decode';

export const getUserId = () => {
    let token = localStorage.getItem('accessToken');
    console.log(token);
    let jwtDecodeObj = jwtDecode(token);
    let nameIdentifier = Object.keys(jwtDecodeObj).find((val) => val.includes('nameidentifier'));
    let userId = jwtDecodeObj[nameIdentifier];
    return userId;
};
export const clearToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};
