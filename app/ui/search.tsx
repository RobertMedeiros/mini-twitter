"use client";

import { FaSearch } from "react-icons/fa";
import { useContext, useState, useCallback } from "react";
import { SearchContext } from "@/app/contexts/SearchContext";

export default function Search() {
    const context = useContext(SearchContext);
    const [localValue, setLocalValue] = useState("");

    // Debounce: aguarda 500ms sem digitação antes de atualizar
    const handleSearchChange = useCallback((value: string) => {
        setLocalValue(value);
        
        const timer = setTimeout(() => {
            if (context) {
                context.setSearchQuery(value);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [context]);

    const handleClear = () => {
        setLocalValue("");
        if (context) {
            context.setSearchQuery("");
        }
    };

    return (
        <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative group">
                <FaSearch className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl" />
                <input 
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-full py-2 pl-10 pr-4 outline-none focus:border-[#1ba0f3] dark:focus:border-[#1ba0f3] focus:ring-1 focus:ring-[#1ba0f3] transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                    placeholder="Pesquise posts..." 
                    type="text"
                    value={localValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                {localValue && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    )
}