import { Link } from '@inertiajs/react';
import { Bot } from 'lucide-react';
import MarkusLogo from '@/components/markus/markus-logo';
import { home } from '@/routes';

type Props = {
    title?: string;
    description?: string;
    children: React.ReactNode;
};

export default function MarkusAuthLayout({ title, description, children }: Props) {
    return (
        <div className="dark flex min-h-screen items-center justify-center bg-[#0A0A0B] font-sans text-[#E0E0E1]">
            <div className="flex w-full max-w-sm flex-col gap-8">
                <div className="flex flex-col items-center gap-4">
                    <Link href={home()} className="flex flex-col items-center gap-2">
                        <MarkusLogo />
                    </Link>
                    {title && (
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-semibold text-[#E0E0E1]">
                                {title}
                            </h1>
                            {description && (
                                <p className="text-sm text-[#6B6B76]">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div className="rounded-xl border border-[#1F1F23] bg-[#111114] p-6">
                    {children}
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#6B6B76]">
                    <Bot className="h-3 w-3" />
                    Powered by MarkusAI Agents
                </div>
            </div>
        </div>
    );
}
