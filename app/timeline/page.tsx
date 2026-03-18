import CardText from "../ui/cardText"
import CardPost from "../ui/cardPost"

export default function Timeline() {
    return (
        <div className="bg-[#e7f3f9] flex-1 px-4 py-8 flex flex-col items-center">
            <div className="w-full max-w-2xl space-y-6">
                <CardText />
                <div className="flex items-center gap-4 px-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent Updates</span>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                </div>
                <CardPost />
            </div>
        </div>
    )
}