import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    Bot,
    FileText,
    Linkedin,
    MessageSquare,
    Search,
    Share2,
    Zap,
} from 'lucide-react';
import MarkusLogo from '@/components/markus/markus-logo';
import { MarkusButton } from '@/components/markus/markus-ui';
import { dashboard, login, register } from '@/routes';

const features = [
    {
        icon: Search,
        title: 'SEO Agent',
        description: 'Optimize your content for search engines automatically.',
    },
    {
        icon: FileText,
        title: 'Writer Agent',
        description: 'Generate high-quality blog posts and marketing copy.',
    },
    {
        icon: MessageSquare,
        title: 'Reddit Agent',
        description: 'Engage authentically with relevant communities.',
    },
    {
        icon: Share2,
        title: 'Social Agents',
        description: 'Manage X, LinkedIn, and Hacker News presence.',
    },
    {
        icon: BarChart3,
        title: 'ROI Analytics',
        description: 'Track performance across all marketing channels.',
    },
    {
        icon: Bot,
        title: '8+ Agents',
        description: 'A full team of specialized AI marketing agents.',
    },
];

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="MarkusAI - Your AI Marketing Team" />

            <div className="dark flex min-h-screen flex-col bg-[#0A0A0B] font-sans text-[#E0E0E1]">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-[#1F1F23] px-4 py-3 md:px-6 md:py-4 lg:px-12">
                    <MarkusLogo />
                    <nav className="flex items-center gap-2 md:gap-4">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <MarkusButton>
                                    Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                                </MarkusButton>
                            </Link>
                        ) : (
                            <>
                                <Link href={login()}>
                                    <MarkusButton variant="ghost" className="text-sm md:text-base">Log in</MarkusButton>
                                </Link>
                                {canRegister && (
                                    <Link href={register()}>
                                        <MarkusButton className="text-sm md:text-base">
                                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                        </MarkusButton>
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero */}
                <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center md:px-6 md:py-24">
                    <div className="flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-medium text-[#D4AF37] md:px-4">
                        <Zap className="h-3 w-3" />
                        Your AI-Powered Marketing Team
                    </div>

                    <h1 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-[#E0E0E1] sm:text-4xl md:mt-8 md:text-5xl lg:text-6xl">
                        Meet your <span className="text-[#D4AF37]">CMO</span>,{' '}
                        powered by 8 AI agents
                    </h1>

                    <p className="mt-4 max-w-xl text-base text-[#6B6B76] md:mt-6 md:text-lg">
                        MarkusAI deploys a team of specialized AI agents that handle
                        SEO, content creation, social media, and community engagement
                        autonomously.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10">
                        {!auth.user && canRegister && (
                            <Link href={register()} className="w-full sm:w-auto">
                                <MarkusButton size="lg" className="w-full sm:w-auto">
                                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                                </MarkusButton>
                            </Link>
                        )}
                        <Link href={login()} className="w-full sm:w-auto">
                            <MarkusButton variant="outline" size="lg" className="w-full sm:w-auto">
                                Watch Demo
                            </MarkusButton>
                        </Link>
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-3 text-sm text-[#6B6B76] sm:flex-row sm:gap-6">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            All agents active
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                            3 tasks pending approval
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="border-t border-[#1F1F23] px-4 py-12 md:px-6 md:py-20 lg:px-12">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-[#E0E0E1]">
                            Specialized agents for every channel
                        </h2>
                        <p className="mb-12 text-center text-[#6B6B76]">
                            Each agent is an expert in its domain, working together
                            as a coordinated marketing team.
                        </p>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="rounded-xl border border-[#1F1F23] bg-[#111114] p-6 transition-all hover:border-[#D4AF37]/30"
                                >
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#1F1F23] bg-[#0E0E11]">
                                        <feature.icon className="h-5 w-5 text-[#D4AF37]" />
                                    </div>
                                    <h3 className="font-semibold text-[#E0E0E1]">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-[#6B6B76]">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-[#1F1F23] px-6 py-6 text-center text-sm text-[#4B4B52]">
                    MarkusAI &mdash; AI-powered marketing automation
                </footer>
            </div>
        </>
    );
}
