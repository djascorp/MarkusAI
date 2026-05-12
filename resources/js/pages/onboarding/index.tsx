import { Head, router } from '@inertiajs/react';
import {
    CheckCircle2,
    Loader2,
    Search,
    Settings2,
    Sparkles,
    Target,
} from 'lucide-react';
import { useState } from 'react';
import {
    MarkusBadge,
    MarkusButton,
    MarkusCard,
    MarkusCardContent,
    MarkusCardDescription,
    MarkusCardFooter,
    MarkusCardHeader,
    MarkusCardTitle,
} from '@/components/markus/markus-ui';
import { dashboard } from '@/routes';
import type { OnboardingPayload } from '@/types/marketing';

export default function OnboardingIndex({ agents, goals }: OnboardingPayload) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [url, setUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // The onboarding workflow is currently a guided UI mockup.
    // Submission is wired client-side until the backend persistence is built.
    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setStep(2);
        }, 1500);
    };

    const handleDeploy = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setStep(3);
        }, 1500);
    };

    const goToDashboard = () => router.visit(dashboard().url);

    return (
        <>
            <Head title="Setup MarkusAI" />
            <div className="mx-auto max-w-3xl animate-in py-8 duration-500 fade-in slide-in-from-bottom-4">
                <div className="mb-8">
                    <h1 className="text-center text-3xl font-bold tracking-tight text-[#E0E0E1]">
                        Setup your AI CMO
                    </h1>
                    <p className="mt-2 text-center text-[#6B6B76]">
                        Deploy your marketing team in under 3 minutes.
                    </p>

                    {/* Progress Bar */}
                    <div className="relative mt-8">
                        <div className="absolute top-1/2 left-0 -z-10 h-0.5 w-full -translate-y-1/2 bg-[#1F1F23]" />
                        <div
                            className="absolute top-1/2 left-0 -z-10 h-0.5 -translate-y-1/2 bg-[#D4AF37] transition-all duration-500"
                            style={{
                                width:
                                    step === 1
                                        ? '0%'
                                        : step === 2
                                          ? '50%'
                                          : '100%',
                            }}
                        />
                        <div className="flex justify-between">
                            {([1, 2, 3] as const).map((n) => (
                                <div
                                    key={n}
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                                        step >= n
                                            ? 'bg-[#D4AF37] text-black'
                                            : 'border-2 border-[#1F1F23] bg-[#0E0E11] text-[#6B6B76]'
                                    }`}
                                >
                                    {n}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {step === 1 && (
                    <MarkusCard className="border-[#D4AF37]/20 shadow-md">
                        <MarkusCardHeader className="pb-2 text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                                <Search className="h-6 w-6" />
                            </div>
                            <MarkusCardTitle className="text-2xl">
                                What&apos;s your website?
                            </MarkusCardTitle>
                            <MarkusCardDescription>
                                We&apos;ll analyze your product, SEO structure,
                                and brand voice.
                            </MarkusCardDescription>
                        </MarkusCardHeader>
                        <MarkusCardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://yourstartup.com"
                                        className="block w-full rounded-xl border border-[#1F1F23]/50 bg-[#0E0E11] py-4 pr-32 pl-4 text-lg text-[#E0E0E1] placeholder-[#6B6B76] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]"
                                    />
                                    <div className="absolute inset-y-2 right-2 flex items-center">
                                        <MarkusButton
                                            onClick={handleAnalyze}
                                            disabled={!url || isAnalyzing}
                                            className="h-full px-6 transition-all"
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                                                    Analyzing
                                                </>
                                            ) : (
                                                'Analyze Site'
                                            )}
                                        </MarkusButton>
                                    </div>
                                </div>
                                <p className="text-center text-xs text-[#6B6B76]">
                                    By proceeding, you allow our agents to crawl
                                    your public pages.
                                </p>
                            </div>
                        </MarkusCardContent>
                    </MarkusCard>
                )}

                {step === 2 && (
                    <MarkusCard className="animate-in border-[#D4AF37]/20 shadow-md zoom-in-95 fade-in">
                        <MarkusCardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <MarkusCardTitle className="flex items-center gap-2 text-2xl">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />{' '}
                                        Analysis Complete
                                    </MarkusCardTitle>
                                    <MarkusCardDescription>
                                        We&apos;ve identified your product and
                                        extracted your brand voice.
                                    </MarkusCardDescription>
                                </div>
                                <div className="flex items-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1.5 text-sm font-semibold text-[#D4AF37]">
                                    <Sparkles className="mr-1 h-4 w-4" />
                                    SaaS/B2B Model
                                </div>
                            </div>
                        </MarkusCardHeader>
                        <MarkusCardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border border-[#1F1F23] bg-[#111114] p-4">
                                    <h4 className="mb-2 flex items-center text-sm font-semibold text-[#E0E0E1]">
                                        <Target className="mr-1.5 h-4 w-4 text-[#6B6B76]" />{' '}
                                        Primary Audience
                                    </h4>
                                    <p className="text-sm text-[#9A9A9E]">
                                        Founders, developers, and product teams
                                        looking to automate workflows.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-[#1F1F23] bg-[#111114] p-4">
                                    <h4 className="mb-2 flex items-center text-sm font-semibold text-[#E0E0E1]">
                                        <Settings2 className="mr-1.5 h-4 w-4 text-[#6B6B76]" />{' '}
                                        Detected Tone
                                    </h4>
                                    <p className="text-sm text-[#9A9A9E]">
                                        Professional but approachable,
                                        technical, pragmatic, action-oriented.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-[#E0E0E1]">
                                    Select your Primary Goals
                                </h4>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    {goals.map((goal) => (
                                        <label
                                            key={goal.key}
                                            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-colors ${
                                                goal.default
                                                    ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                                                    : 'border-transparent bg-[#111114] hover:bg-[#1C1C21]'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                defaultChecked={goal.default}
                                                className="h-4 w-4 rounded border-[#1F1F23]/50 text-[#D4AF37] focus:ring-[#D4AF37]"
                                            />
                                            <span
                                                className={`text-sm font-medium ${
                                                    goal.default
                                                        ? 'text-[#E0E0E1]'
                                                        : 'text-[#9A9A9E]'
                                                }`}
                                            >
                                                {goal.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-[#E0E0E1]">
                                    Agents to Deploy
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {agents.map((agent) => (
                                        <MarkusBadge
                                            key={agent.name}
                                            variant={
                                                agent.optional
                                                    ? 'outline'
                                                    : 'default'
                                            }
                                            className={`px-3 py-1.5 text-sm ${
                                                agent.optional
                                                    ? 'border-dashed'
                                                    : ''
                                            }`}
                                        >
                                            {agent.name}
                                            {agent.optional && ' (Optional)'}
                                        </MarkusBadge>
                                    ))}
                                </div>
                            </div>
                        </MarkusCardContent>
                        <MarkusCardFooter className="flex justify-end gap-3 rounded-b-xl border-t border-[#1F1F23] bg-[#111114]">
                            <MarkusButton
                                variant="ghost"
                                onClick={() => setStep(1)}
                            >
                                Back
                            </MarkusButton>
                            <MarkusButton
                                onClick={handleDeploy}
                                disabled={isAnalyzing}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                                        Deploying Agents...
                                    </>
                                ) : (
                                    'Deploy CMO Team'
                                )}
                            </MarkusButton>
                        </MarkusCardFooter>
                    </MarkusCard>
                )}

                {step === 3 && (
                    <MarkusCard className="animate-in border-emerald-500/20 py-8 text-center shadow-md zoom-in-95 fade-in">
                        <MarkusCardContent className="space-y-6">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
                                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-[#E0E0E1]">
                                Your AI CMO is deployed!
                            </h2>
                            <p className="mx-auto max-w-md text-[#6B6B76]">
                                Your agents are currently analyzing competitors
                                and generating the first batch of content
                                drafts.
                            </p>
                            <div className="pt-4">
                                <MarkusButton size="lg" onClick={goToDashboard}>
                                    Go to Dashboard
                                </MarkusButton>
                            </div>
                        </MarkusCardContent>
                    </MarkusCard>
                )}
            </div>
        </>
    );
}
