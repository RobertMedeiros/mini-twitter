import { FaRegImage } from "react-icons/fa6";


export default function CardText() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
            <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <img alt="User" className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCET0n_-zu2mRNhBeosKnFkfD9LhhTftMSJe4TKlWXom8XM1rMx38Gel7k8z-Pk94X-VJmh0a_9wXaEBri0AOOWRQPiImO13ucozQfABV1bcZT9Q5raAUscwmzrfJWaHBSMu9orFL5X_VbrVyIm0lDZYcq53n_dWNqvm4fpKAJsVhYZ488UIJ0vV7fpXf5YtTeabUXSD_E1JWFWhe4J0wo03VmB3Inbaxwmd8T9sMLJ1_lzTOqAIsbeEx4FQT4AbBwlNhx6FwCxNyM" />
                </div>
                <div className="flex-1 space-y-4">
                    <textarea
                        className="w-full bg-transparent border-none focus:ring-0 text-lg resize-none placeholder-slate-500 min-h-[80px]"
                        placeholder="What's on your mind?"></textarea>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                            <button className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors">
                                <FaRegImage className="material-symbols-outlined text-[22px]"/>
                            </button>
                        </div>
                        <button
                            className="bg-primary text-white font-bold px-8 py-2.5 rounded-full hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}