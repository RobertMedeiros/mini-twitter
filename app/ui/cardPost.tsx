

export default function CardPost() {
    return (
        <article className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all group">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                            <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsWJIQmf4ERVeWIVuzlOSRzy8NpQ649kEeEm2rnCD9mD02DKPGukCrgTsun21_3vtXPrPguKdNzDOlGXpFVGLhWSL8vm0ihH2R1HzX1jDtFb9ieNqB3clNJf3aIaDlKrz4RUk83r9zo2iM1SgHy9bEUZktsHNz-Ke8XjKXGDdZNSG1Qcgv6lAv9BrtOet7pmCMAvW9Nlhiqf9cI5tJ6f--067eaIRIrkdkyV9kB-aRbuPPRjfdrb6gafK4dyAoXqj9BaCT5BSSnAs" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                <h3 className="font-bold text-sm hover:text-primary transition-colors cursor-pointer">Design Master</h3>
                                <span className="material-symbols-outlined text-primary text-[16px] [font-variation-settings:'FILL'_1]">verified</span>
                            </div>
                            <p className="text-xs text-slate-500">@design_mstr · 2h</p>
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold text-lg leading-tight">Starting a new selection process! 🚀</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        Really excited to share what we've been working on. The team has put in countless hours to make this seamless. Check out the screenshot below! #product #launch
                    </p>
                    <div className="rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800">
                        <img className="w-full h-auto aspect-video object-cover" data-alt="B2bit marketing visual" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUejmwH_OjlgzWoIsm0WlGUBur-HVFcf7a_S9VaB7APyfOaRUP550MHZY9LWRBez31oJ9fIIF1MOijtcgpenrmF2hGHJkPqvAh1F0mwISa-_GzInaUlH0g5xcmX-jzMt1rIcZD64LXscKE2pMw2lB6XyhKr01i49woVJW506HMJ-pI11LdnqjWZ782BXgEg0Eoku_Di8BvmnFq6mrDWC8zRpapbOVXZAjUR8GWFCVuX-KJpd9UtvrYeBvT3TLGRjjE8U_9fvsVhvE" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-6">
                            <button className="flex items-center gap-2 text-red-500 group/btn">
                                <div className="p-2 rounded-full group-hover/btn:bg-red-500/10">
                                    <span className="material-symbols-outlined text-[20px] [font-variation-settings:'FILL'_1]">favorite</span>
                                </div>
                                <span className="text-xs font-medium">892</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}