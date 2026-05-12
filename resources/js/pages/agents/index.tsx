import { Head, Link } from '@inertiajs/react';
import { Bot, Settings } from 'lucide-react';
import { AgentIcon } from '@/components/markus/agent-icon';
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
import agents from '@/routes/agents';
import type { Agent } from '@/types/marketing';

const statusVariant = (status: string): 'success' | 'warning' | 'secondary' => {
    if (status === 'Active') {
        return 'success';
    }

    if (status === 'Alerting') {
        return 'warning';
    }

    return 'secondary';
};

export default function AgentsIndex({ agents: items }: { agents: Agent[] }) {
    return (
        <>
            <Head title="AI Agents" />
            <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-4">
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-[#E0E0E1]">
                            AI Agents
                        </h1>
                        <p className="mt-1 text-[#6B6B76]">
                            Manage your team of specialized marketing agents.
                        </p>
                    </div>
                    <MarkusButton>
                        <Bot className="mr-2 h-4 w-4" /> Add Custom Agent
                    </MarkusButton>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((agent) => (
                        <MarkusCard
                            key={agent.id}
                            className="border-[#1F1F23] transition-all hover:border-[#D4AF37]/30 hover:shadow-md"
                        >
                            <MarkusCardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#1F1F23] bg-[#111114] text-[#9A9A9E]">
                                        <AgentIcon
                                            name={agent.icon}
                                            className="h-6 w-6"
                                        />
                                    </div>
                                    <MarkusBadge
                                        variant={statusVariant(agent.status)}
                                    >
                                        {agent.status}
                                    </MarkusBadge>
                                </div>
                                <MarkusCardTitle className="mt-4 text-xl">
                                    {agent.name}
                                </MarkusCardTitle>
                                <MarkusCardDescription>
                                    {agent.description}
                                </MarkusCardDescription>
                            </MarkusCardHeader>
                            <MarkusCardContent>
                                {agent.tasks > 0 ? (
                                    <div className="rounded-md bg-[#111114] px-3 py-2 text-sm font-medium text-[#9A9A9E]">
                                        {agent.tasks} active{' '}
                                        {agent.tasks === 1 ? 'task' : 'tasks'}
                                    </div>
                                ) : (
                                    <div className="rounded-md border border-dashed border-[#1F1F23] px-3 py-2 text-sm text-[#6B6B76]">
                                        No active tasks
                                    </div>
                                )}
                            </MarkusCardContent>
                            <MarkusCardFooter className="flex gap-2 pt-0">
                                <Link
                                    href={agents.show(agent.id).url}
                                    prefetch
                                    className="flex-1"
                                >
                                    <MarkusButton
                                        variant="outline"
                                        className="w-full"
                                    >
                                        View Details
                                    </MarkusButton>
                                </Link>
                                <MarkusButton
                                    variant="ghost"
                                    size="icon"
                                    className="flex-shrink-0"
                                >
                                    <Settings className="h-4 w-4 text-[#6B6B76]" />
                                </MarkusButton>
                            </MarkusCardFooter>
                        </MarkusCard>
                    ))}
                </div>
            </div>
        </>
    );
}
