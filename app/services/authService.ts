import { api } from "@/app/lib/api"; // sua instância do axios
import { LoginData } from "@/app/schemas/auth";

export const loginUser = async (data: LoginData) => {
  // O endpoint costuma ser /auth/login ou similar no seu back
  const response = await api.post('/auth/login', data);
  return response.data;
};