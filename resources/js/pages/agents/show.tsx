import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    CheckCircle2,
    Pause,
    Play,
    Settings,
} from 'lucide-react';
import {
    MarkusBadge,
    MarkusButton,
    MarkusCard,
    MarkusCardContent,
    MarkusCardDescription,
    MarkusCardHeader,
    MarkusCardTitle,
} from '@/components/markus/markus-ui';
import type { AgentDetail } from '@/types/marketing';

const statusVariant = (status: string): 'success' | 'warning' | 'secondary' => {
    if (status === 'Active') {
        return 'success';
    }

    if (status === 'Alerting') {
        return 'warning';
    }

    return 'secondary';
};

export default function AgentShow({ agent }: { agent: AgentDetail }) {
    return (
        <>
            <Head title={agent.name} />
            <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1F1F23] bg-[#0E0E11] shadow-sm md:h-16 md:w-16">
                            <div className="relative">
                                <Activity className="h-6 w-6 text-[#D4AF37] md:h-8 md:w-8" />
                                {agent.status === 'Active' && (
                                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                <h1 className="text-2xl font-bold tracking-tight text-[#E0E0E1] md:text-3xl">
                                    {agent.name}
                                </h1>
                                <MarkusBadge
                                    variant={statusVariant(agent.status)}
                                >
                                    {agent.status}
                                </MarkusBadge>
                            </div>
                            <p className="mt-1 text-sm text-[#6B6B76] md:text-base">
                                {agent.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {agent.status !== 'Idle' ? (
                            <MarkusButton
                                variant="outline"
                                className="text-[#9A9A9E]"
                            >
                                <Pause className="mr-2 h-4 w-4" /> Pause Agent
                            </MarkusButton>
                        ) : (
                            <MarkusButton
                                variant="outline"
                                className="text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-700"
                            >
                                <Play className="mr-2 h-4 w-4" /> Start Agent
                            </MarkusButton>
                        )}
                        <MarkusButton variant="outline">
                            <Settings className="mr-2 h-4 w-4" /> Configure
                        </MarkusButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {agent.stats.map((stat) => (
                        <MarkusCard key={stat.label}>
                            <MarkusCardContent className="p-6 pt-6 text-center">
                                <p className="mb-1 text-sm font-medium text-[#6B6B76]">
                                    {stat.label}
                                </p>
                                <h3 className="text-3xl font-bold text-[#E0E0E1]">
                                    {stat.value}
                                </h3>
                            </MarkusCardContent>
                        </MarkusCard>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <MarkusCard>
                        <MarkusCardHeader>
                            <MarkusCardTitle>
                                Current Tasks &amp; Log
                            </MarkusCardTitle>
                            <MarkusCardDescription>
                                What the agent is working on right now
                            </MarkusCardDescription>
                        </MarkusCardHeader>
                        <MarkusCardContent className="space-y-4">
                            {agent.currentTasks.map((task) => (
                                <div
                                    key={task.task}
                                    className="flex items-start gap-4 rounded-lg border border-[#1F1F23] bg-[#111114] p-4"
                                >
                                    {task.type === 'info' && (
                                        <Activity className="mt-0.5 h-5 w-5 text-[#D4AF37]" />
                                    )}
                                    {task.type === 'warning' && (
                                        <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                                    )}
                                    {task.type === 'success' && (
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                                    )}

                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#E0E0E1]">
                                            {task.task}
                                        </p>
                                        <p className="mt-1 text-xs text-[#6B6B76]">
                                            {task.status}
                                        </p>
                                    </div>
                                    {task.type === 'warning' && (
                                        <MarkusButton
                                            size="sm"
                                            variant="outline"
                                        >
                                            Review
                                        </MarkusButton>
                                    )}
                                </div>
                            ))}
                        </MarkusCardContent>
                    </MarkusCard>

                    <MarkusCard>
                        <MarkusCardHeader>
                            <MarkusCardTitle>Strategy Context</MarkusCardTitle>
                            <MarkusCardDescription>
                                Rules and constraints for this agent
                            </MarkusCardDescription>
                        </MarkusCardHeader>
                        <MarkusCardContent>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="mb-2 text-xs font-semibold tracking-wider text-[#6B6B76] uppercase">
                                        Target Audience
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <MarkusBadge variant="secondary">
                                            SaaS Founders
                                        </MarkusBadge>
                                        <MarkusBadge variant="secondary">
                                            Indie Hackers
                                        </MarkusBadge>
                                        <MarkusBadge variant="secondary">
                                            Early-stage Startups
                                        </MarkusBadge>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-2 text-xs font-semibold tracking-wider text-[#6B6B76] uppercase">
                                        Tone of Voice
                                    </h4>
                                    <p className="rounded-md border border-[#1F1F23] bg-[#111114] p-3 text-sm text-[#9A9A9E]">
                                        Authoritative but accessible. No
                                        corporate jargon. Use short sentences.
                                        Friendly, technical, and extremely
                                        pragmatic.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="mb-2 text-xs font-semibold tracking-wider text-[#6B6B76] uppercase">
                                        Constraints
                                    </h4>
                                    <ul className="list-disc space-y-1 pl-4 text-sm text-[#9A9A9E] marker:text-[#4B4B52]">
                                        <li>
                                            Never make promises about exact ROI
                                            numbers.
                                        </li>
                                        <li>
                                            Do not use emojis in professional
                                            (LinkedIn) posts.
                                        </li>
                                        <li>
                                            Always require human approval before
                                            posting to external communities.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </MarkusCardContent>
                    </MarkusCard>
                </div>
            </div>
        </>
    );
}
