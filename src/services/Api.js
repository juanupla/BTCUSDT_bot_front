import axios from 'axios';
import { getToken, saveToken } from './Auth';


const api = axios.create({
  baseURL: 'http://localhost:8080/',
});


export const getEMAs = async () => {
  try {
    const response = await api.get('api/v1/historical-emas'); 
    return response.data.data;
  } catch (error) {
    console.error('Error fetching EMAs:', error);
    return []; 
  }
};


export const getOperations = async () => {
  const now = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" });
  const currentDate = new Date(now).toISOString(); // convierte a formato ISO - requerida por la ap
  const oneYearAgo = new Date(new Date(now).setFullYear(new Date(now).getFullYear() - 1)).toISOString();
  return api
    .get(`api/v1/public-historical-operations?start=${oneYearAgo}&end=${currentDate}`)
    .then(response => response.data);
};


export const getStatus = async () => {
  try {
    const response = await api.get('api/v1/bot-status'); // Usar la instancia de axios configurada
    const { data } = response.data; // Extraer el `data` del Response
    return data
  } catch (error) {
    console.error('Error fetching bot status:', error);
    return 'Error fetching status';
  }
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

export const postLogin = async (email, password) => {
  try {
    const response = await api.post('api/auth/login', { email, password });
    if (response.data.data.token) {
      saveToken(response.data.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};