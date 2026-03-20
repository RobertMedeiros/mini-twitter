"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegImage } from "react-icons/fa6";
import { createPost } from "@/app/services/postService";

export default function CardText() {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState("");

    const { mutate: handlePost, isPending } = useMutation({
        mutationFn: async () => {
            setError("");

            // Validações
            if (title.trim().length < 3) {
                throw new Error("Título deve ter no mínimo 3 caracteres");
            }
            if (content.trim().length < 1) {
                throw new Error("Conteúdo é obrigatório");
            }

            if (image && image.length > 5 * 1024 * 1024) {
                throw new Error("Imagem muito grande: Limite de 5MB");
            }

            return createPost(title.trim(), content.trim(), image || undefined);
        },
        onSuccess: () => {
            // Limpa os campos após sucesso
            setTitle("");
            setContent("");
            setImage(null);
            // Invalida a timeline para buscar os novos posts
            queryClient.invalidateQueries({ queryKey: ['timeline_posts'] });
        },
        onError: (err: any) => {
            setError(err.message || "Erro ao criar post");
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validação de tamanho
            if (file.size > 5 * 1024 * 1024) {
                setError("Imagem muito grande: Limite de 5MB");
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const isFormValid = title.trim().length >= 3 && content.trim().length >= 1;

    return (
        <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 transition-all">
            <div className="flex gap-4">
                <div className="flex-1 space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 outline-none text-slate-900 font-semibold text-lg placeholder:text-slate-400"
                        placeholder="Título do post..."
                        disabled={isPending}
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 outline-none text-slate-900 text-lg resize-none placeholder:text-slate-400"
                        placeholder="O que está em sua mente?"
                        rows={4}
                        disabled={isPending}
                    />

                    {image && (
                        <div className="relative inline-block">
                            <img
                                src={image}
                                alt="Preview"
                                className="max-w-xs max-h-64 rounded-lg object-cover"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {error && (
                        <p className="text-red-500 text-sm font-medium">{error}</p>
                    )}

                    <div className="h-px bg-slate-100 w-full"></div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                            <label className="cursor-pointer p-2 rounded-full hover:bg-[#1ba0f3]/10 text-[#1ba0f3] transition-colors">
                                <FaRegImage className="material-symbols-outlined text-[22px]" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    disabled={isPending}
                                />
                            </label>
                        </div>
                        <button
                            onClick={() => handlePost()}
                            disabled={!isFormValid || isPending}
                            className={`cursor-pointer font-bold px-8 py-2.5 rounded-full transition-all active:scale-[0.98] shadow-md ${
                                isFormValid && !isPending
                                    ? "bg-[#1ba0f3] text-white hover:bg-[#1ba0f3]/90"
                                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                            }`}
                        >
                            {isPending ? "Postando..." : "Post"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}