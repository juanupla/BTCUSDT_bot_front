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

export const getPrivateOperations = async () => {
  const token = getToken();
  const now = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" });
  const currentDate = new Date(now).toISOString(); // convierte a formato ISO - requerida por la ap
  const oneYearAgo = new Date(new Date(now).setFullYear(new Date(now).getFullYear() - 1)).toISOString();
  return api
    .get(`api/v1/private-historical-operations?start=${oneYearAgo}&end=${currentDate}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.data.data);
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


export const getClosedOperations = async () => {
  try {
    const response = await api.get('api/v1/public-performance-operations');
    return response.data.data; // Retorna directamente el array data
  } catch (error) {
    console.error('Error fetching close-operations:', error);
    return [];
  }
};

export const getPrivateCloseOperations = async () => {
  try {
    const token = getToken();
    const response = await api.get('api/v1/private-performance-operations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching close-operations:', error);
    return [];
  }
};


export const getPerformancePerMonth = async () => {
  try{
    const response = await api.get('api/v1/public-performance-per-month');
    return response.data.data;

  } catch (error){
    console.error('Error fetching performance per month:', error);
    return 'Error fetching performance per month';
  }
};

export const getPrivatePerformancePerMonth = async () =>{
  try{
    const token = getToken();
    const response = await api.get('api/v1/private-performance-per-month',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data;

  } catch (error){
    console.error('Error fetching performance per month:', error);
    return 'Error fetching performance per month';
  }
}

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