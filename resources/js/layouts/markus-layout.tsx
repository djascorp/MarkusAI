import { MarkusSidebar } from '@/components/markus/markus-sidebar';
import { MarkusTopbar } from '@/components/markus/markus-topbar';

type Props = {
    children: React.ReactNode;
};

export default function MarkusLayout({ children }: Props) {
    return (
        <div className="dark flex h-screen overflow-hidden bg-[#0A0A0B] font-sans text-[#E0E0E1] select-none">
            <MarkusSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <MarkusTopbar />
                <main className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
