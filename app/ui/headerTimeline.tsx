"use client";

import { FaSearch } from "react-icons/fa";
import { PiBird, PiSignOut } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/services/authService";
import Search from "./search";

export default function HeaderTimeline() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
            // Realiza a chamada na API passando o token (se existir)
            await logoutUser({ token: token || undefined });
        } catch (error) {
            console.error("Erro ao realizar logout na API:", error);
        } finally {
            // Sempre limpa o cache local e redireciona (boa prática)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("token");
            }
            router.push("/");
        }
    };

    return (
        <header className="sticky top-0 z-20 bg-white backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-2 text-[#1ba0f3]">
                <div className="size-8 flex items-center justify-center">
                    <PiBird className="material-symbols-outlined text-4xl [font-variation-settings:'FILL'_1]" />
                </div>
                <h1 className="font-bold text-lg hidden sm:block">Mini Feed</h1>
            </div>
            <Search />
            <button
                onClick={handleLogout}
                className="cursor-pointer p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center"
                title="Sair"
            >
                <PiSignOut className="text-2xl" />
            </button>
            <div className="flex items-center gap-4">

            </div>
        </header>
    )
}