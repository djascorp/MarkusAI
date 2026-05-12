import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';

const sidebarNavItems = [
    { title: 'Profile', href: edit() },
    { title: 'Security', href: editSecurity() },
    { title: 'Appearance', href: editAppearance() },
];

export default function MarkusSettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#E0E0E1]">
                    Settings
                </h2>
                <p className="mt-1 text-sm text-[#6B6B76]">
                    Manage your profile and account settings
                </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
                <aside className="w-full lg:w-48">
                    <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:space-y-1" aria-label="Settings">
                        {sidebarNavItems.map((item) => (
                            <Link
                                key={item.href.url}
                                href={item.href}
                                className={cn(
                                    'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isCurrentOrParentUrl(item.href)
                                        ? 'bg-[#1C1C21] text-[#D4AF37]'
                                        : 'text-[#9A9A9E] hover:bg-[#15151A] hover:text-[#E0E0E1]',
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>

                <div className="flex-1">
                    <div className="rounded-xl border border-[#1F1F23] bg-[#111114] p-6">
                        <section className="max-w-xl space-y-8">
                            {children}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
