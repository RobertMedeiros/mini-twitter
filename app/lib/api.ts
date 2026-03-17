import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // 10 segundos antes de desistir
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exemplo de como interceptar erros globalmente (opcional, mas pro)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na chamada da API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);