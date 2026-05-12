import { Bell, Info, Search } from 'lucide-react';

export function MarkusTopbar() {
    return (
        <header className="relative z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-[#1F1F23] bg-[#0A0A0B]/50 px-6 backdrop-blur-md">
            <div className="flex flex-1 items-center">
                <div className="relative w-full max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-[#6B6B76]" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-lg border border-[#1F1F23] bg-[#111114] py-2 pr-3 pl-10 text-sm text-[#E0E0E1] placeholder-[#6B6B76] transition-colors focus:bg-[#1C1C21] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                        placeholder="Search campaigns, content, or ask an agent..."
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded border border-[#D4AF37]/20 bg-[#1F1F23] px-2 py-0.5 font-mono text-[10px] tracking-tighter text-[#D4AF37]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]" />
                    CMO_ACTIVE (8_AGENTS)
                </div>
                <button className="relative rounded-full p-1 text-[#9A9A9E] hover:bg-[#15151A] hover:text-[#E0E0E1]">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full border-2 border-[#0A0A0B] bg-red-500" />
                </button>
                <button className="rounded-full p-1 text-[#9A9A9E] hover:bg-[#15151A] hover:text-[#E0E0E1]">
                    <Info className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
