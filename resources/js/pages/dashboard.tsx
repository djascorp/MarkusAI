import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    FileText,
    TrendingUp,
    Users,
} from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import {
    MarkusButton,
    MarkusCard,
    MarkusCardContent,
    MarkusCardDescription,
    MarkusCardHeader,
    MarkusCardTitle,
} from '@/components/markus/markus-ui';
import type { DashboardSnapshot } from '@/types/marketing';

export default function Dashboard({
    metrics,
    trafficTrend,
    priorityActions,
    agentActivity,
}: DashboardSnapshot) {
    return (
        <>
            <Head title="CMO Dashboard" />
            <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#E0E0E1] md:text-3xl">
                            CMO Dashboard
                        </h1>
                        <p className="mt-1 text-[#6B6B76]">
                            Here&apos;s your marketing performance overview for
                            the last 30 days.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <MarkusButton variant="outline" className="text-sm">
                            Download Report
                        </MarkusButton>
                        <MarkusButton className="text-sm">Approve Priorities (3)</MarkusButton>
                    </div>
                </div>

                {/* Top Metrics */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <MetricCard
                        label="Marketing Health Score"
                        icon={<Activity className="h-5 w-5" />}
                        iconBg="bg-[#D4AF37]/20 text-[#D4AF37]"
                    >
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-3xl font-bold text-[#E0E0E1]">
                                {metrics.healthScore.value}
                                <span className="text-lg font-normal text-[#6B6B76]">
                                    /100
                                </span>
                            </h2>
                            <span className="flex items-center text-sm font-medium text-emerald-500">
                                <TrendingUp className="mr-1 h-3 w-3" />+
                                {metrics.healthScore.delta}
                            </span>
                        </div>
                        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#1C1C21]">
                            <div
                                className="h-full rounded-full bg-[#D4AF37]"
                                style={{
                                    width: `${metrics.healthScore.value}%`,
                                }}
                            />
                        </div>
                    </MetricCard>

                    <MetricCard
                        label="Organic Traffic"
                        icon={<Users className="h-5 w-5" />}
                        iconBg="bg-emerald-500/20 text-emerald-500"
                    >
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-3xl font-bold text-[#E0E0E1]">
                                {metrics.organicTraffic.value}
                            </h2>
                            <span className="flex items-center text-sm font-medium text-emerald-500">
                                <TrendingUp className="mr-1 h-3 w-3" />
                                {metrics.organicTraffic.delta}
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-[#6B6B76]">
                            +{metrics.organicTraffic.weekly} new visitors this
                            week
                        </p>
                    </MetricCard>

                    <MetricCard
                        label="Content Drafts"
                        icon={<FileText className="h-5 w-5" />}
                        iconBg="bg-amber-500/20 text-amber-500"
                    >
                        <h2 className="text-3xl font-bold text-[#E0E0E1]">
                            {metrics.drafts.value}
                        </h2>
                        <p className="mt-4 text-sm text-[#6B6B76]">
                            {metrics.drafts.label}
                        </p>
                    </MetricCard>

                    <MetricCard
                        label="Agent Alerts"
                        icon={<AlertTriangle className="h-5 w-5" />}
                        iconBg="bg-red-500/20 text-red-500"
                    >
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-3xl font-bold text-[#E0E0E1]">
                                {metrics.alerts.value}
                            </h2>
                            <span className="flex items-center text-sm font-medium text-red-500">
                                {metrics.alerts.critical} critical
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-[#6B6B76]">
                            {metrics.alerts.label}
                        </p>
                    </MetricCard>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Chart */}
                    <MarkusCard className="lg:col-span-2">
                        <MarkusCardHeader>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <MarkusCardTitle>
                                        Organic Traffic Growth
                                    </MarkusCardTitle>
                                    <MarkusCardDescription>
                                        Targeting 10k monthly visitors by Q3
                                    </MarkusCardDescription>
                                </div>
                                <select className="rounded-md border border-[#1F1F23] bg-[#0E0E11] px-2 py-1 text-sm text-[#E0E0E1] focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                                    <option>Last 6 months</option>
                                    <option>Last 12 months</option>
                                </select>
                            </div>
                        </MarkusCardHeader>
                        <MarkusCardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={trafficTrend}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="colorOrganic"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#D4AF37"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#D4AF37"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: '#6B6B76',
                                                fontSize: 12,
                                            }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: '#6B6B76',
                                                fontSize: 12,
                                            }}
                                            dx={-10}
                                        />
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="#1F1F23"
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: '1px solid #1F1F23',
                                                background: '#0E0E11',
                                                boxShadow:
                                                    '0 4px 6px -1px rgb(0 0 0 / 0.4)',
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="organic"
                                            stroke="#D4AF37"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorOrganic)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </MarkusCardContent>
                    </MarkusCard>

                    {/* Priority Actions */}
                    <MarkusCard>
                        <MarkusCardHeader>
                            <MarkusCardTitle>Priority Actions</MarkusCardTitle>
                            <MarkusCardDescription>
                                High ROI tasks suggested by AI
                            </MarkusCardDescription>
                        </MarkusCardHeader>
                        <MarkusCardContent>
                            <div className="space-y-4">
                                {priorityActions.map((action) => (
                                    <div
                                        key={action.title}
                                        className="flex items-start gap-3 rounded-lg border border-[#1F1F23] bg-[#111114]/50 p-3 transition-colors hover:bg-[#111114]"
                                    >
                                        <div className="mt-0.5 rounded-full border border-[#1F1F23] bg-[#0E0E11] p-1">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-[#E0E0E1]">
                                                {action.title}
                                            </h4>
                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="text-xs text-[#6B6B76]">
                                                    {action.agent}
                                                </span>
                                                <span className="h-1 w-1 rounded-full bg-[#4B4B52]" />
                                                <span className="text-xs font-medium text-[#D4AF37]">
                                                    {action.impact}
                                                </span>
                                            </div>
                                        </div>
                                        <MarkusButton
                                            size="sm"
                                            variant="ghost"
                                            className="hidden h-7 sm:inline-flex"
                                        >
                                            Review
                                        </MarkusButton>
                                    </div>
                                ))}
                            </div>
                            <MarkusButton
                                variant="outline"
                                className="mt-4 w-full"
                            >
                                View all 14 actions
                            </MarkusButton>
                        </MarkusCardContent>
                    </MarkusCard>
                </div>

                {/* Agents Status */}
                <MarkusCard>
                    <MarkusCardHeader>
                        <MarkusCardTitle>Agent Activity</MarkusCardTitle>
                        <MarkusCardDescription>
                            Live status of your CMO team
                        </MarkusCardDescription>
                    </MarkusCardHeader>
                    <MarkusCardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {agentActivity.map((agent) => (
                                <div
                                    key={agent.name}
                                    className="flex cursor-pointer flex-col justify-between rounded-xl border border-[#1F1F23] p-4 transition-colors hover:border-[#D4AF37]/30"
                                >
                                    <div className="mb-4 flex items-start justify-between">
                                        <h4 className="text-sm font-semibold text-[#E0E0E1]">
                                            {agent.name}
                                        </h4>
                                        {agent.active ? (
                                            <span className="relative flex h-2 w-2">
                                                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                            </span>
                                        ) : (
                                            <span className="h-2 w-2 rounded-full bg-[#1F1F23]" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="mb-1 text-xs text-[#6B6B76]">
                                            {agent.status}
                                        </p>
                                        <p className="truncate text-sm font-medium text-[#E0E0E1]">
                                            {agent.items}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </MarkusCardContent>
                </MarkusCard>
            </div>
        </>
    );
}

type MetricCardProps = {
    label: string;
    icon: React.ReactNode;
    iconBg: string;
    children: React.ReactNode;
};

function MetricCard({ label, icon, iconBg, children }: MetricCardProps) {
    return (
        <MarkusCard>
            <MarkusCardContent className="p-6 pt-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-[#6B6B76]">
                            {label}
                        </p>
                        {children}
                    </div>
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
                    >
                        {icon}
                    </div>
                </div>
            </MarkusCardContent>
        </MarkusCard>
    );
}
