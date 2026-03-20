import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toggleLikePost } from '@/app/services/postService';
import { getCurrentUserId } from '@/app/utils/jwtHelper';

/**
 * Hook customizado para gerenciar likes de posts usando localStorage
 * @param postId - ID do post
 * @param initialLikesCount - Contagem inicial de likes do backend
 * @returns { isLiked, likes, handleLike, isLiking }
 */
export const useLikePost = (postId: string | number, initialLikesCount: number = 0) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikesCount);
    const previousUserIdRef = useRef<string | null>(null);

    // Sincroniza quando o usuário muda OU quando initialLikesCount muda (dados do servidor)
    useEffect(() => {
        const userId = getCurrentUserId();
        
        // Se o usuário mudou (logout/login/troca de conta), resincroniza
        if (previousUserIdRef.current !== userId) {
            previousUserIdRef.current = userId;
        }

        if (userId) {
            // Chave dinâmica atrelada ao usuário
            const storageKey = `likes_user_${userId}`;
            const likedPosts = JSON.parse(localStorage.getItem(storageKey) || '[]') as (string | number)[];
            
            // Verifica se este post já foi curtido por este usuário
            const userAlreadyLiked = likedPosts.includes(postId);
            setIsLiked(userAlreadyLiked);
            // Sincroniza a contagem com o backend
            setLikes(initialLikesCount);
        }
    }, [postId, initialLikesCount]);

    // Mutation para fazer requisição à API
    const { mutate: handleLike, isPending: isLiking } = useMutation({
        mutationFn: async () => {
            // Atualização otimista imediata
            const wasLiked = isLiked;
            setIsLiked(!wasLiked);
            setLikes((prev) => wasLiked ? prev - 1 : prev + 1);

            try {
                // Chamada real à API
                await toggleLikePost(postId);

                // Atualiza localStorage após sucesso
                const userId = getCurrentUserId();
                if (userId) {
                    const storageKey = `likes_user_${userId}`;
                    const likedPosts = JSON.parse(localStorage.getItem(storageKey) || '[]') as (string | number)[];

                    if (!wasLiked) {
                        // Adiciona o post ao array de likes
                        likedPosts.push(postId);
                    } else {
                        // Remove o post do array de likes
                        const index = likedPosts.indexOf(postId);
                        if (index > -1) {
                            likedPosts.splice(index, 1);
                        }
                    }

                    localStorage.setItem(storageKey, JSON.stringify(likedPosts));
                }
            } catch (error) {
                // Reverte a atualização otimista em caso de erro
                setIsLiked(wasLiked);
                setLikes((prev) => wasLiked ? prev + 1 : prev - 1);
                throw error;
            }
        },
        onError: (err: any) => {
            console.error("Erro ao dar like:", err);
        }
    });

    return {
        isLiked,
        likes,
        handleLike,
        isLiking
    };
};
