import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginData = z.infer<typeof LoginSchema>;


// Exemplo do que adicionar no final do arquivo:
export const SignupSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type SignupData = z.infer<typeof SignupSchema>;

export const LogoutSchema = z.object({
  token: z.string().optional(),
});

export type LogoutData = z.infer<typeof LogoutSchema>;