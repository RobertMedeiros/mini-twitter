"use client";

import { useContext, useEffect, useRef } from "react";
import CardText from "../ui/cardText"
import CardPost, { PostData } from "../ui/cardPost"
import HeaderTimeline from "../ui/headerTimeline"
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTimelinePosts } from '@/app/services/postService';
import { SearchContext } from "@/app/contexts/SearchContext";

export default function Timeline() {
    const context = useContext(SearchContext);
    const searchQuery = context?.searchQuery || "";
    const queryClient = useQueryClient();
    const previousTokenRef = useRef<string | null>(null);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Monitora mudanças de token (login/logout) e invalida o cache
    useEffect(() => {
        const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        
        // Se o token mudou (login/logout/troca de conta), invalida o cache
        if (previousTokenRef.current !== currentToken) {
            previousTokenRef.current = currentToken;
            queryClient.invalidateQueries({ queryKey: ['timeline_posts'] });
        }
    }, [queryClient]);

    // useInfiniteQuery para scroll infinito
    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['timeline_posts', searchQuery],
        queryFn: ({ pageParam = 1 }) => fetchTimelinePosts(searchQuery, pageParam),
        getNextPageParam: (lastPage, allPages) => {
            // Se a última página retornou menos de 10 posts (tamanho padrão), não há próxima página
            if (!lastPage || !Array.isArray(lastPage) || lastPage.length < 10) {
                return undefined;
            }
            return allPages.length + 1;
        },
        initialPageParam: 1,
    });

    // Flatten all posts from all pages
    const posts = data?.pages.flatMap(page => page) ?? [];

    // IntersectionObserver para detectar quando chegou ao final
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="bg-[#e7f3f9] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors">
            <div className="flex h-full grow flex-col">
                <HeaderTimeline />
                <div className="bg-[#e7f3f9] dark:bg-slate-950 flex-1 px-4 py-8 flex flex-col items-center transition-colors">
                    <div className="w-full max-w-2xl space-y-6">
                        <CardText />
                        <div className="flex items-center gap-4 px-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400"></span>
                            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                        </div>
                        
                        {isLoading && <p className="text-center text-slate-500 dark:text-slate-400 py-4">Carregando posts...</p>}
                        {isError && <p className="text-center text-red-500 py-4">Erro ao carregar os posts.</p>}
                        
                        {posts.length === 0 && !isLoading && !isError && (
                            <p className="text-center text-slate-500 dark:text-slate-400 py-4">{searchQuery ? "Nenhum post encontrado com essa busca." : "Nenhum post encontrado."}</p>
                        )}

                        {posts.map((post) => (
                            <CardPost key={post.id} post={post} />
                        ))}

                        {/* Elemento observer para detectar final da lista */}
                        <div ref={observerTarget} className="h-1" />

                        {isFetchingNextPage && (
                            <p className="text-center text-slate-500 dark:text-slate-400 py-4">Carregando mais posts...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}