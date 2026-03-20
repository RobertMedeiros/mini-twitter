"use client";

import { useContext, useEffect, useRef } from "react";
import CardText from "../ui/cardText"
import CardPost, { PostData } from "../ui/cardPost"
import HeaderTimeline from "../ui/headerTimeline"
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTimelinePosts } from '@/app/services/postService';
import { SearchContext } from "@/app/contexts/SearchContext";

export default function Timeline() {
    const context = useContext(SearchContext);
    const searchQuery = context?.searchQuery || "";
    const queryClient = useQueryClient();
    const previousTokenRef = useRef<string | null>(null);

    // Monitora mudanças de token (login/logout) e invalida o cache
    useEffect(() => {
        const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        
        // Se o token mudou (login/logout/troca de conta), invalida o cache
        if (previousTokenRef.current !== currentToken) {
            previousTokenRef.current = currentToken;
            queryClient.invalidateQueries({ queryKey: ['timeline_posts'] });
        }
    }, [queryClient]);

    const { data: posts, isLoading, isError } = useQuery<PostData[]>({
        queryKey: ['timeline_posts', searchQuery],
        queryFn: () => fetchTimelinePosts(searchQuery)
    });

    return (
        <div className="bg-[#e7f3f9] font-sans text-slate-900 min-h-screen flex flex-col">
            <div className="flex h-full grow flex-col">
                <HeaderTimeline />
                <div className="bg-[#e7f3f9] flex-1 px-4 py-8 flex flex-col items-center">
                    <div className="w-full max-w-2xl space-y-6">
                        <CardText />
                        <div className="flex items-center gap-4 px-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400"></span>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>
                        
                        {isLoading && <p className="text-center text-slate-500 py-4">Carregando posts...</p>}
                        {isError && <p className="text-center text-red-500 py-4">Erro ao carregar os posts.</p>}
                        
                        {Array.isArray(posts) && posts.length === 0 && !isLoading && !isError && (
                            <p className="text-center text-slate-500 py-4">{searchQuery ? "Nenhum post encontrado com essa busca." : "Nenhum post encontrado."}</p>
                        )}

                        {Array.isArray(posts) && posts.map((post) => (
                            <CardPost key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}