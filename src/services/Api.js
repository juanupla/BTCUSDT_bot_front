import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:8080', // Reemplaza con la URL de tu API
});

export const getEMAs = () => {
  return api.get('api/v1/historical-emas').then(response => response.data);
};

export const getOperations = () => {
  return api.get('api/v1/public-historical-operations').then(response => response.data);
};

export const getStatus = () => {
    return api.get('api/v1/bot-status').then(response => response.data);
  };

export const getClosedOperations = () => {
  return api.get('api/v1/public-closed-operations').then(response => response.data);
};

export const getCumulativePerformancePerMonth = () => {
    return api.get('api/v1/cumulative-performance-per-month').then(response => response.data);
  };

export const getPerformancePerMonth = () => {
  return api.get('api/v1/performance-per-month').then(response => response.data);
};

export const postLogin = (email, password) => {
    return api
      .post('api/auth/login', { email, password })  
      .then(response => response.data)
      .catch(error => {
        console.error('Error en el login:', error);
        throw error;  // Propagar el error si es necesario
      });
  };