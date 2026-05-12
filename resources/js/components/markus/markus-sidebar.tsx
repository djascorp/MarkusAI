import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Bot,
    Code,
    FileText,
    Inbox,
    LayoutDashboard,
    Linkedin,
    MessageSquare,
    Search,
    Settings,
    Share2,
    User,
    X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import MarkusLogo from '@/components/markus/markus-logo';
import { useSidebar } from '@/components/markus/sidebar-context';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import agents from '@/routes/agents';
import analytics from '@/routes/analytics';
import content from '@/routes/content';
import onboarding from '@/routes/onboarding';
import { edit as editProfile } from '@/routes/profile';

type NavLink = {
    id: string;
    label: string;
    icon: LucideIcon;
    href: string;
    matches?: (currentUrl: string) => boolean;
};

const navItems: NavLink[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: dashboard().url,
    },
    {
        id: 'agents',
        label: 'AI Agents',
        icon: Bot,
        href: agents.index().url,
        matches: (url) => url.startsWith('/agents'),
    },
    {
        id: 'content',
        label: 'Content Drafts',
        icon: Inbox,
        href: content.index().url,
    },
    {
        id: 'analytics',
        label: 'ROI & Analytics',
        icon: BarChart3,
        href: analytics.index().url,
    },
    {
        id: 'onboarding',
        label: 'Settings & Strategy',
        icon: Settings,
        href: onboarding.index().url,
    },
];

const agentLinks: NavLink[] = [
    {
        id: 'agent_seo',
        label: 'SEO Agent',
        icon: Search,
        href: agents.show('agent_seo').url,
    },
    {
        id: 'agent_geo',
        label: 'GEO Agent',
        icon: Bot,
        href: agents.show('agent_geo').url,
    },
    {
        id: 'agent_writer',
        label: 'Writer Agent',
        icon: FileText,
        href: agents.show('agent_writer').url,
    },
    {
        id: 'agent_reddit',
        label: 'Reddit Agent',
        icon: MessageSquare,
        href: agents.show('agent_reddit').url,
    },
    {
        id: 'agent_hn',
        label: 'Hacker News',
        icon: Share2,
        href: agents.show('agent_hn').url,
    },
    {
        id: 'agent_x',
        label: 'X (Twitter)',
        icon: Share2,
        href: agents.show('agent_x').url,
    },
    {
        id: 'agent_linkedin',
        label: 'LinkedIn',
        icon: Linkedin,
        href: agents.show('agent_linkedin').url,
    },
    {
        id: 'agent_coding',
        label: 'Coding Agent',
        icon: Code,
        href: agents.show('agent_coding').url,
    },
];

export function MarkusSidebar() {
    const { url, props } = usePage();
    const { close } = useSidebar();
    const getInitials = useInitials();
    const user = props.auth?.user;
    const userInitials = user ? getInitials(user.name) : 'JR';
    const userName = user?.name ?? 'Julien R.';

    const isActive = (item: NavLink) =>
        item.matches ? item.matches(url) : url.startsWith(item.href);

    const handleNav = () => close();

    return (
        <div className="flex h-full flex-col">
            {/* Header with close button on mobile */}
            <div className="flex h-16 items-center justify-between border-b border-[#1F1F23] px-6">
                <Link href={dashboard().url} prefetch onClick={handleNav}>
                    <MarkusLogo />
                </Link>
                <button
                    onClick={close}
                    className="rounded-md p-1 text-[#6B6B76] hover:bg-[#15151A] hover:text-[#E0E0E1] lg:hidden"
                    aria-label="Close menu"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item);

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                prefetch
                                onClick={handleNav}
                                className={cn(
                                    'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    active
                                        ? 'bg-[#1C1C21] text-white'
                                        : 'text-[#9A9A9E] hover:bg-[#15151A]',
                                )}
                            >
                                <Icon
                                    className={cn(
                                        'h-5 w-5',
                                        active
                                            ? 'text-[#D4AF37]'
                                            : 'text-[#6B6B76]',
                                    )}
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-4 border-t border-[#1F1F23] px-3 pt-4">
                    <Link
                        href={editProfile()}
                        prefetch
                        onClick={handleNav}
                        className={cn(
                            'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                            url.startsWith('/settings')
                                ? 'bg-[#1C1C21] text-white'
                                : 'text-[#9A9A9E] hover:bg-[#15151A]',
                        )}
                    >
                        <User
                            className={cn(
                                'h-5 w-5',
                                url.startsWith('/settings')
                                    ? 'text-[#D4AF37]'
                                    : 'text-[#6B6B76]',
                            )}
                        />
                        Profile & Settings
                    </Link>
                </div>

                <div className="mt-8 px-6">
                    <h3 className="mb-3 text-[10px] font-bold tracking-widest text-[#6B6B76] uppercase">
                        Active Agents
                    </h3>
                    <nav className="space-y-1">
                        {agentLinks.map((item) => {
                            const active = url === item.href;

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    prefetch
                                    onClick={handleNav}
                                    className={cn(
                                        'flex w-full items-center gap-3 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                                        active
                                            ? 'bg-[#1C1C21] text-[#E0E0E1]'
                                            : 'text-[#9A9A9E] hover:bg-[#15151A]',
                                    )}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    <span className="flex-1 text-left">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className="border-t border-[#1F1F23] bg-[#0E0E11] p-4">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1F1F23] bg-[#1C1C21] font-bold text-[#D4AF37]">
                        {userInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[#E0E0E1]">
                            {userName}
                        </p>
                        <p className="truncate text-[10px] text-[#6B6B76]">
                            Plan: Premium (~$99/m)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
