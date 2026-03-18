import axios from 'axios';

// Puxa a variável de ambiente ou usa a porta 3000 como segurança
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn("⚠️ AVISO: NEXT_PUBLIC_API_URL não foi encontrada. Lembre-se de reiniciar o frontend (npm run dev). Usando fallback para http://localhost:3000");
}

export const api = axios.create({
  baseURL,
  timeout: 10000, // 10 segundos antes de desistir
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exemplo de como interceptar erros globalmente (opcional, mas pro)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // O servidor respondeu com um status de erro (4xx, 5xx)
      // Se for 401 (Não Autorizado), não logamos no console para não poluir, 
      // pois a nossa interface já cuida de mostrar a mensagem na tela.
      if (error.response.status !== 401) {
        console.error(`🚨 Erro da API [Status ${error.response.status}]:`, error.response.data);
      }
    } else {
      // Erro de rede (ex: servidor fora do ar, CORS, ou URL incorreta)
      console.error('🌐 Erro de Rede / CORS:', error.message);
    }
    return Promise.reject(error);
  }
);