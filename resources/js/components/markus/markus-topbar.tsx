import { Bell, Info, Menu, Search } from 'lucide-react';
import { useSidebar } from '@/components/markus/sidebar-context';

export function MarkusTopbar() {
    const { toggle } = useSidebar();

    return (
        <header className="relative z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-[#1F1F23] bg-[#0A0A0B]/50 px-4 backdrop-blur-md md:px-6">
            <div className="flex flex-1 items-center gap-3">
                {/* Hamburger - mobile only */}
                <button
                    onClick={toggle}
                    className="rounded-md p-2 text-[#9A9A9E] hover:bg-[#15151A] hover:text-[#E0E0E1] lg:hidden"
                    aria-label="Open menu"
                >
                    <Menu className="h-5 w-5" />
                </button>

                {/* Search - hidden on small screens */}
                <div className="relative hidden w-full max-w-md sm:block">
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
            <div className="flex items-center gap-2 md:gap-4">
                {/* CMO badge - hidden on small screens */}
                <div className="hidden items-center gap-2 rounded border border-[#D4AF37]/20 bg-[#1F1F23] px-2 py-0.5 font-mono text-[10px] tracking-tighter text-[#D4AF37] sm:flex">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]" />
                    CMO_ACTIVE (8_AGENTS)
                </div>
                {/* Mobile short badge */}
                <div className="flex items-center gap-1.5 rounded border border-[#D4AF37]/20 bg-[#1F1F23] px-1.5 py-0.5 text-[9px] text-[#D4AF37] sm:hidden">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4AF37]" />
                    8 agents
                </div>
                <button className="relative rounded-full p-1 text-[#9A9A9E] hover:bg-[#15151A] hover:text-[#E0E0E1]">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full border-2 border-[#0A0A0B] bg-red-500" />
                </button>
                <button className="hidden rounded-full p-1 text-[#9A9A9E] hover:bg-[#15151A] hover:text-[#E0E0E1] md:block">
                    <Info className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
