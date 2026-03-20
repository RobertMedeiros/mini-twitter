import { api } from "@/app/lib/api"; // sua instância do axios
import { LoginData, SignupData, LogoutData } from "@/app/schemas/auth";

export const loginUser = async (data: LoginData) => {
  // O endpoint costuma ser /auth/login ou similar no seu back
  const response = await api.post('/auth/login', data);
  return response.data;
};

// Exemplo da função que chama o seu backend:
export const registerUser = async (data: SignupData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const logoutUser = async (data: LogoutData) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const response = await api.post("/auth/logout", data, {
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  return response.data;
}