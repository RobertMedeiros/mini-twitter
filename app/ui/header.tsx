import { PiBird } from "react-icons/pi";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 lg:px-40 py-3">
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
                </div>
            </div>
        </header>
    )
}