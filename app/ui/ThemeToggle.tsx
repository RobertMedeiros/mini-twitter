"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { PiSun, PiMoon } from "react-icons/pi";

export default function ThemeToggle() {
    const context = useContext(ThemeContext);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!context || !mounted) return <div className="w-10 h-10" />; // Evita erro de hidratação (hydration mismatch)

    const { isDark, toggleTheme } = context;

    return (
        <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 text-slate-500 hover:text-[#1ba0f3] hover:bg-[#1ba0f3]/10 dark:text-slate-400 dark:hover:text-[#1ba0f3] dark:hover:bg-[#1ba0f3]/20 rounded-full transition-colors flex items-center justify-center"
            title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
        >
            {isDark ? <PiSun className="text-2xl" /> : <PiMoon className="text-2xl" />}
        </button>
    );
}