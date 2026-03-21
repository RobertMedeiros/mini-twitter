"use client";

import Link from "next/link";
import Header from "../ui/header";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SignupSchema, SignupData } from '@/app/schemas/auth';
import { registerUser } from '@/app/services/authService';
import { useRouter } from 'next/navigation';

export default function Cadastro() {
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const router = useRouter();

    // 1. Configura o formulário com Zod para validar nome, email e senha
    const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
        resolver: zodResolver(SignupSchema),
    });

    // 2. Configura a mutação para enviar os dados para o backend
    const { mutate, isPending, isError } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log("Cadastro realizado com sucesso!", data);
            setShowSuccessModal(true); // Exibe o modal de sucesso ao invés de redirecionar direto
        },
    });

    const onSubmit = (data: SignupData) => {
        mutate(data); // Dispara a função de requisição à API
    };

    return (
        <div className="bg-[#e7f3f9] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex-1 flex flex-col transition-colors">
      <div className="flex h-full grow flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 md:p-10">
          <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors">

            <div className="relative h-40 bg-[#1ba0f3] flex items-center justify-center">

              <div
                className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:24px_24px]">
              </div>
              <h2 className="text-white text-4xl leading-tight tracking-tight">Mini Twitter</h2>
            </div>
            <div className="px-8 pb-12 pt-8">
              <div className="text-left mb-8">
                <h1 className="text-[#1ba0f3] text-3xl font-bold leading-tight">Crie sua conta!</h1>
                <p className="text-slate-500 dark:text-slate-400">Preencha seus dados abaixo para se cadastrar.</p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                {isError && (
                  <div className="text-red-500 text-sm font-semibold text-center bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-100 dark:border-red-500/20">
                    Ocorreu um erro ao tentar realizar o cadastro. Verifique os dados e tente novamente.
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-[#1ba0f3] text-sm font-bold ml-1">Nome</label>
                  <input
                    {...register("name")}
                    className="w-full rounded-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-[#1ba0f3] dark:focus:border-[#1ba0f3] focus:ring-[#1ba0f3] h-14 px-6 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none border"
                    placeholder="Insira seu nome" type="text" />
                  {errors.name && <span className="text-red-500 text-sm ml-2">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#1ba0f3] text-sm font-bold ml-1">E-mail</label>
                  <input
                    {...register("email")}
                    className="w-full rounded-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-[#1ba0f3] dark:focus:border-[#1ba0f3] focus:ring-[#1ba0f3] h-14 px-6 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none border"
                    placeholder="Insira seu e-mail" type="text" />
                  {errors.email && <span className="text-red-500 text-sm ml-2">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#1ba0f3] text-sm font-bold ml-1">Senha</label>
                  <div className="relative flex items-center">
                    <input
                      {...register("password")}
                      className="w-full rounded-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-[#1ba0f3] dark:focus:border-[#1ba0f3] focus:ring-[#1ba0f3] h-14 pl-6 pr-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none border"
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
                  {isPending ? "Cadastrando..." : "Cadastrar"}
                </button>
              </form>

              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>Já possui uma conta?</span>
                  <Link className="text-[#1ba0f3] font-bold hover:underline" href="/">Faça login no Mini Twitter</Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal de Sucesso */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-200 border border-slate-100 dark:border-slate-800">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Cadastro concluído!</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Sua conta foi criada com sucesso. Agora é só fazer login para acessar a Social.
              </p>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-[#1ba0f3] hover:bg-[#1ba0f3]/90 text-white text-lg font-bold py-4 rounded-full transition-all active:scale-[0.98] shadow-md shadow-blue-200"
              >
                Ir para o Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    )
}