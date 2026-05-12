import { SidebarProvider, useSidebar } from '@/components/markus/sidebar-context';
import { MarkusSidebar } from '@/components/markus/markus-sidebar';
import { MarkusTopbar } from '@/components/markus/markus-topbar';
import { cn } from '@/lib/utils';

type Props = {
    children: React.ReactNode;
};

function LayoutInner({ children }: Props) {
    const { isOpen, close } = useSidebar();

    return (
        <div className="dark flex h-dvh overflow-hidden bg-[#0A0A0B] font-sans text-[#E0E0E1] select-none">
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 lg:hidden"
                    onClick={close}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar: fixed drawer on mobile, static on desktop */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-40 w-64 transform border-r border-[#1F1F23] bg-[#0A0A0B] transition-transform duration-200 ease-in-out lg:relative lg:z-auto lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full',
                )}
            >
                <MarkusSidebar />
            </aside>

            <div className="flex flex-1 flex-col overflow-hidden">
                <MarkusTopbar />
                <main className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function MarkusLayout({ children }: Props) {
    return (
        <SidebarProvider>
            <LayoutInner>{children}</LayoutInner>
        </SidebarProvider>
    );
}
