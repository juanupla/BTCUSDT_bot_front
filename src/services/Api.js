import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

export const getEMAs = async () => {
  try {
    const response = await api.get('api/v1/historical-emas');  // Ajusta esta URL a tu endpoint correcto
    return response.data;  // Devolvemos la respuesta completa
  } catch (error) {
    console.error('Error fetching EMAs:', error);
    return { status: 'ERROR', message: error.message, data: [] };
  }
};


export const getOperations = () => {
  return api.get('api/v1/public-historical-operations').then(response => response.data);
};

export const getStatus = async () => {
  try {
    const response = await api.get('api/v1/bot-status'); // Usar la instancia de axios configurada
    const { data } = response.data; // Extraer el `data` del Response
    return data ? 'Running' : 'Stopped'; // Convertir el booleano en texto
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

export const postLogin = (email, password) => {
    return api
      .post('api/auth/login', { email, password })  
      .then(response => response.data)
      .catch(error => {
        console.error('Error en el login:', error);
        throw error; 
      });
  };