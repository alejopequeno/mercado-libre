/**
 * API Client
 * Centralized HTTP client configuration
 */
import axios, { AxiosInstance, AxiosError } from 'axios';

// Base URL del backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Crear instancia de Axios con configuración base
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests (puedes agregar auth tokens aquí)
apiClient.interceptors.request.use(
  (config) => {
    // Aquí podrías agregar tokens de autenticación
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses (manejo de errores centralizado)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Manejo de errores centralizado
    if (error.response) {
      // El servidor respondió con un status fuera del rango 2xx
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // La request se hizo pero no hubo respuesta
      console.error('Network Error:', error.message);
    } else {
      // Algo pasó al configurar la request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
