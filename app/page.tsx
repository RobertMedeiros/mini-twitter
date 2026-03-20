"use client";

import { PiBird } from "react-icons/pi";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LoginSchema, LoginData } from '@/app/schemas/auth';
import { loginUser } from '@/app/services/authService';
import Link from 'next/link';
import Header from '@/app/ui/header';
import { useRouter } from 'next/navigation';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  
  const { mutate, isPending, isError } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login realizado!", data);
      
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      router.push("/timeline"); // Redireciona para a timeline após o login
    },
  });

  const onSubmit = (data: LoginData) => {
    mutate(data); // Dispara a função loginUser
  };

  return (
    <div className="bg-[#e7f3f9] font-sans text-slate-900 min-h-screen flex flex-col">
      <div className="flex h-full grow flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 md:p-10">
          <div className="w-full max-w-[480px] bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">

            <div className="relative h-40 bg-[#1ba0f3] flex items-center justify-center">

              <div
                className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:24px_24px]">
              </div>
              <h2 className="text-white text-4xl leading-tight tracking-tight">Mini Twitter</h2>
            </div>
            <div className="px-8 pb-12 pt-8">
              <div className="text-left mb-8">
                <h1 className="text-[#1ba0f3] text-3xl font-bold leading-tight">Olá, de novo!</h1>
                <p className="text-slate-500">Por favor insira suas credenciais para fazer login.</p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                
                {isError && (
                  <div className="text-red-500 text-sm font-semibold text-center bg-red-50 p-3 rounded-xl border border-red-100">
                    E-mail ou senha incorretos.
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-[#1ba0f3] text-sm font-bold ml-1">E-mail</label>
                  <input
                    {...register("email")}
                    className="w-full rounded-full border-slate-200 bg-slate-50 text-slate-900 focus:border-[#1ba0f3] focus:ring-[#1ba0f3] h-14 px-6 text-base placeholder:text-slate-400 transition-all outline-none border"
                    placeholder="Insira seu e-mail" type="text" />
                  {errors.email && <span className="text-red-500 text-sm ml-2">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#1ba0f3] text-sm font-bold ml-1">Senha</label>
                  <div className="relative flex items-center">
                    <input
                      {...register("password")}
                      className="w-full rounded-full border-slate-200 bg-slate-50 text-slate-900 focus:border-[#1ba0f3] focus:ring-[#1ba0f3] h-14 pl-6 pr-12 text-base placeholder:text-slate-400 transition-all outline-none border"
                      placeholder="Insira sua senha" type={showPassword ? "text" : "password"} />
                    <button
                      className="absolute right-5 text-slate-400 hover:text-[#1ba0f3] flex items-center justify-center"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}>
                      <span className="material-symbols-outlined text-xl">{showPassword ? <FaRegEye/> : <FaRegEyeSlash/>}</span>
                    </button>
                  </div>
                  {errors.password && <span className="text-red-500 text-sm ml-2">{errors.password.message}</span>}
                </div>

                <button
                  className="cursor-pointer w-full flex items-center justify-center rounded-full h-14 bg-[#1ba0f3] text-white text-lg font-bold tracking-wide hover:bg-[#1ba0f3]/90 shadow-md shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isPending}>
                  {isPending ? "Entrando..." : "Entrar"}
                </button>
              </form>

              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <span>Não possui uma conta?</span>
                  <Link className="text-[#1ba0f3] font-bold hover:underline" href="/cadastro">Cadastre-se na Social</Link>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
