export const saveToken = (token) => {
    localStorage.setItem('token', token);
};
  
export const getToken = () => {
    return localStorage.getItem('token');
};
  
export const removeToken = () => {
    localStorage.setItem('token', '');
};
  
export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};