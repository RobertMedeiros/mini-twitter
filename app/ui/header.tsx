import { PiBird } from "react-icons/pi";
import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex items-center justify-between border-b border-slate-200 px-6 lg:px-40 py-3 bg-white">
            <div className="flex items-center gap-2 text-[#1ba0f3]">
                <div className="size-8 flex items-center justify-center">
                    <PiBird className="material-symbols-outlined text-4xl [font-variation-settings:'FILL'_1]" />
                </div>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <div className="hidden md:flex items-center gap-9">
                    <a className="text-slate-600 hover:text-[#1ba0f3] text-sm font-medium leading-normal"
                        href="#">Settings</a>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/cadastro"
                        className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-[#1ba0f3] text-white text-sm font-bold leading-normal tracking-wide hover:bg-[#1ba0f3]/90 transition-colors">
                        <span>Cadastre-se</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}