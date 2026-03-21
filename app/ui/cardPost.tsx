"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { deletePost, updatePost } from "@/app/services/postService";
import { getCurrentUserId } from "@/app/utils/jwtHelper";
import { useLikePost } from "@/app/hooks/useLikePost";

// Crie a estrutura baseada no que a sua API/BD retorna
export interface PostData {
    id?: string | number;
    authorId?: string | number;
    authorName: string;
    authorUsername: string;
    content: string;
    title: string;
    likesCount?: number;
    likedByCurrentUser?: boolean;
    createdAt: string;
    image?: string;
}

export default function CardPost({ post }: { post: PostData }) {
    const queryClient = useQueryClient();
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState("");
    
    // Usar o hook customizado para gerenciar likes com localStorage
    const { isLiked, likes, handleLike, isLiking } = useLikePost(post.id!, post.likesCount || 0);
    
    // Estados para edição
    const [isEditingOpen, setIsEditingOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(post.title);
    const [editContent, setEditContent] = useState(post.content);
    const [editImage, setEditImage] = useState<string | null>(post.image || null);
    const [editError, setEditError] = useState("");

    useEffect(() => {
        setCurrentUserId(getCurrentUserId());
    }, []);

    const isAuthor = currentUserId && post.authorId && currentUserId === String(post.authorId);

    const { mutate: handleDelete, isPending: isDeleting } = useMutation({
        mutationFn: async () => {
            setDeleteError("");
            await deletePost(post.id!);
        },
        onSuccess: () => {
            // Invalida a timeline para remover o post deletado
            queryClient.invalidateQueries({ queryKey: ['timeline_posts'] });
        },
        onError: (err: any) => {
            setDeleteError(err.message || "Erro ao deletar post");
        }
    });

    const { mutate: handleUpdate, isPending: isUpdating } = useMutation({
        mutationFn: async () => {
            setEditError("");

            // Validações
            if (editTitle.trim().length < 3) {
                throw new Error("Título deve ter no mínimo 3 caracteres");
            }
            if (editContent.trim().length < 1) {
                throw new Error("Conteúdo é obrigatório");
            }

            if (editImage && editImage.length > 5 * 1024 * 1024) {
                throw new Error("Imagem muito grande: Limite de 5MB");
            }

            await updatePost(post.id!, editTitle.trim(), editContent.trim(), editImage || undefined);
        },
        onSuccess: () => {
            setIsEditingOpen(false);
            // Não invalida para não desincronizar o localStorage de likes
        },
        onError: (err: any) => {
            setEditError(err.message || "Erro ao atualizar post");
        }
    });

    const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setEditError("Imagem muito grande: Limite de 5MB");
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                setEditImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveEditImage = () => {
        setEditImage(null);
    };

    const handleCancelEdit = () => {
        setIsEditingOpen(false);
        setEditTitle(post.title);
        setEditContent(post.content);
        setEditImage(post.image || null);
        setEditError("");
    };

    const isFormValid = editTitle.trim().length >= 3 && editContent.trim().length >= 1;

    // Formata a data retornada pela API para um padrão mais amigável
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(post.createdAt || Date.now()));

    // Modal de Edição
    if (isEditingOpen) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-100 dark:border-slate-800 transition-colors">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Editar Post</h2>

                    <div className="space-y-3">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-4 py-2 outline-none focus:border-[#1ba0f3] dark:focus:border-[#1ba0f3] focus:ring-1 focus:ring-[#1ba0f3] transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            placeholder="Título do post..."
                            disabled={isUpdating}
                        />

                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-4 py-2 outline-none focus:border-[#1ba0f3] dark:focus:border-[#1ba0f3] focus:ring-1 focus:ring-[#1ba0f3] transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
                            placeholder="Conteúdo do post..."
                            rows={4}
                            disabled={isUpdating}
                        />

                        {editImage && (
                            <div className="relative inline-block w-full">
                                <img
                                    src={editImage}
                                    alt="Preview"
                                    className="w-full max-h-48 rounded-lg object-cover"
                                />
                                <button
                                    onClick={handleRemoveEditImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {!editImage && (
                            <label className="flex items-center justify-center w-full px-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-[#1ba0f3] dark:hover:border-[#1ba0f3] hover:bg-blue-50 dark:hover:bg-[#1ba0f3]/10 transition-colors cursor-pointer">
                                <span className="text-slate-600 dark:text-slate-400 text-sm">Adicionar imagem</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleEditImageChange}
                                    className="hidden"
                                    disabled={isUpdating}
                                />
                            </label>
                        )}

                        {editError && (
                            <p className="text-red-500 text-sm font-medium">{editError}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleCancelEdit}
                            disabled={isUpdating}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => handleUpdate()}
                            disabled={!isFormValid || isUpdating}
                            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                                isFormValid && !isUpdating
                                    ? "bg-[#1ba0f3] text-white hover:bg-[#1ba0f3]/90"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                            }`}
                        >
                            {isUpdating ? "Atualizando..." : "Atualizar"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <article className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 hover:border-[#1ba0f3]/30 dark:hover:border-[#1ba0f3]/50 transition-all group">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                        <div>
                            <div className="flex items-center gap-1">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-[#1ba0f3] dark:hover:text-[#1ba0f3] transition-colors cursor-pointer">{post.authorName}</h3>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">@{post.authorName} · {formattedDate}</p>
                        </div>
                    </div>
                    {isAuthor && (
                        <div className="flex gap-1">
                            <button
                                onClick={() => setIsEditingOpen(true)}
                                disabled={isUpdating}
                                title="Editar post"
                                className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-[#1ba0f3]/10 text-slate-500 dark:text-slate-400 hover:text-[#1ba0f3] dark:hover:text-[#1ba0f3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <MdModeEdit className="text-[20px]" />
                            </button>
                            <button
                                onClick={() => handleDelete()}
                                disabled={isDeleting}
                                title="Deletar post"
                                className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <MdDeleteOutline className="text-[20px]" />
                            </button>
                        </div>
                    )}
                </div>
                <div className="space-y-4">
                    {post.title && (
                        <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">{post.title}</h2>
                    )}
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {post.content}
                    </p>
                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full max-h-96 object-cover rounded-lg"
                        />
                    )}

                    {deleteError && (
                        <p className="text-red-500 text-sm font-medium">{deleteError}</p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={() => handleLike()}
                                disabled={isLiking}
                                className={`cursor-pointer flex items-center gap-2 group/btn transition-colors ${isLiked ? 'text-red-500' : 'text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-500'} ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-red-50 dark:bg-red-500/10' : 'group-hover/btn:bg-red-500/10'}`}>
                                    {isLiked ? (
                                        <FaHeart className="text-[20px] text-red-500" />
                                    ) : (
                                        <CiHeart className="text-[20px] text-slate-500 dark:text-slate-400" />
                                    )}
                                </div>
                                <span className="text-xs font-medium dark:text-slate-300">{likes}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}