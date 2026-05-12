import { Head } from '@inertiajs/react';
import {
    DollarSign,
    Download,
    MousePointerClick,
    TrendingUp,
    Users,
} from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    XAxis,
    YAxis,
} from 'recharts';
import {
    MarkusBadge,
    MarkusButton,
    MarkusCard,
    MarkusCardContent,
    MarkusCardDescription,
    MarkusCardHeader,
    MarkusCardTitle,
} from '@/components/markus/markus-ui';
import type { AnalyticsReport } from '@/types/marketing';

export default function AnalyticsIndex({
    summary,
    roiByChannel,
    attribution,
    topContent,
}: AnalyticsReport) {
    return (
        <>
            <Head title="ROI & Analytics" />
            <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#E0E0E1] md:text-3xl">
                            ROI &amp; Analytics
                        </h1>
                        <p className="mt-1 text-[#6B6B76]">
                            Track the performance and ROI of your AI CMO team.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <select className="rounded-md border border-[#1F1F23] bg-[#0E0E11] px-3 py-2 text-sm text-[#E0E0E1] focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                            <option>Last 30 Days</option>
                            <option>This Quarter</option>
                            <option>Year to Date</option>
                        </select>
                        <MarkusButton variant="outline">
                            <Download className="mr-2 h-4 w-4" /> Export
                        </MarkusButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <SummaryCard
                        icon={<DollarSign className="h-5 w-5" />}
                        iconBg="bg-emerald-500/20 text-emerald-500"
                        label="Estimated Value Generated"
                        value={summary.valueGenerated}
                        sub="Based on Human Equivalent Cost"
                    />
                    <SummaryCard
                        icon={<TrendingUp className="h-5 w-5" />}
                        iconBg="bg-[#D4AF37]/20 text-[#D4AF37]"
                        label="Conversions (Assisted)"
                        value={String(summary.conversions.value)}
                        sub={summary.conversions.delta}
                        subClassName="text-emerald-500 font-medium"
                    />
                    <SummaryCard
                        icon={<MousePointerClick className="h-5 w-5" />}
                        iconBg="bg-amber-500/20 text-amber-500"
                        label="Total Clicks / Interactions"
                        value={summary.interactions.value}
                        sub={summary.interactions.delta}
                        subClassName="text-emerald-500 font-medium"
                    />
                    <SummaryCard
                        icon={<Users className="h-5 w-5" />}
                        iconBg="bg-blue-500/20 text-blue-500"
                        label="Cost Per Acquisition (CPA)"
                        value={summary.cpa.value}
                        sub={summary.cpa.delta}
                        subClassName="text-emerald-500 font-medium"
                    />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <MarkusCard>
                        <MarkusCardHeader>
                            <MarkusCardTitle>ROI by Channel</MarkusCardTitle>
                            <MarkusCardDescription>
                                Value generated vs. equivalent human cost
                            </MarkusCardDescription>
                        </MarkusCardHeader>
                        <MarkusCardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={roiByChannel}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="#1F1F23"
                                        />
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
                                        />
                                        <RechartsTooltip
                                            cursor={{ fill: '#1C1C21' }}
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: '1px solid #1F1F23',
                                                background: '#0E0E11',
                                            }}
                                        />
                                        <Legend
                                            wrapperStyle={{
                                                paddingTop: '20px',
                                            }}
                                        />
                                        <Bar
                                            dataKey="cost"
                                            name="Equivalent Cost ($)"
                                            fill="#1C1C21"
                                            radius={[4, 4, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="return"
                                            name="Value Generated ($)"
                                            fill="#D4AF37"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </MarkusCardContent>
                    </MarkusCard>

                    <MarkusCard>
                        <MarkusCardHeader>
                            <MarkusCardTitle>
                                Attribution Breakdown
                            </MarkusCardTitle>
                            <MarkusCardDescription>
                                Which sources are driving conversions
                            </MarkusCardDescription>
                        </MarkusCardHeader>
                        <MarkusCardContent className="flex flex-col items-center justify-center gap-4 pb-2 md:flex-row">
                            <div className="h-[250px] w-full max-w-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={attribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {attribution.map((entry) => (
                                                <Cell
                                                    key={`cell-${entry.name}`}
                                                    fill={entry.color}
                                                />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: '1px solid #1F1F23',
                                                background: '#0E0E11',
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full space-y-3 md:flex-1 md:pl-4">
                                {attribution.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-3 w-3 rounded-sm"
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
                                            />
                                            <span className="text-sm font-medium text-[#9A9A9E]">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-[#E0E0E1]">
                                            {item.value}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </MarkusCardContent>
                    </MarkusCard>
                </div>

                <MarkusCard>
                    <MarkusCardHeader>
                        <MarkusCardTitle>
                            Top Performing Content
                        </MarkusCardTitle>
                        <MarkusCardDescription>
                            Content pieces driving the most value
                        </MarkusCardDescription>
                    </MarkusCardHeader>
                    <MarkusCardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] text-left text-sm">
                                <thead className="border-b border-[#1F1F23] bg-[#111114] text-xs text-[#6B6B76] uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">
                                            Content / Post
                                        </th>
                                        <th className="px-6 py-3 font-medium">
                                            Channel
                                        </th>
                                        <th className="px-6 py-3 font-medium">
                                            Views
                                        </th>
                                        <th className="px-6 py-3 font-medium">
                                            Conversions
                                        </th>
                                        <th className="px-6 py-3 text-right font-medium">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1F1F23]">
                                    {topContent.map((row) => (
                                        <tr
                                            key={row.title}
                                            className="bg-[#0E0E11] hover:bg-[#111114]"
                                        >
                                            <td className="px-6 py-4 font-medium text-[#E0E0E1]">
                                                {row.title}
                                            </td>
                                            <td className="px-6 py-4 text-[#6B6B76]">
                                                {row.channel}
                                            </td>
                                            <td className="px-6 py-4">
                                                {row.views}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-emerald-500">
                                                {row.conversions}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <MarkusBadge
                                                    variant={
                                                        row.status === 'Active'
                                                            ? 'success'
                                                            : 'outline'
                                                    }
                                                >
                                                    {row.status}
                                                </MarkusBadge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </MarkusCardContent>
                </MarkusCard>
            </div>
        </>
    );
}

type SummaryCardProps = {
    icon: React.ReactNode;
    iconBg: string;
    label: string;
    value: string;
    sub: string;
    subClassName?: string;
};

function SummaryCard({
    icon,
    iconBg,
    label,
    value,
    sub,
    subClassName,
}: SummaryCardProps) {
    return (
        <MarkusCard>
            <MarkusCardContent className="p-6 pt-6 text-center">
                <div
                    className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
                >
                    {icon}
                </div>
                <p className="mb-1 text-sm font-medium text-[#6B6B76]">
                    {label}
                </p>
                <h3 className="text-3xl font-bold text-[#E0E0E1]">{value}</h3>
                <p
                    className={`mt-2 text-xs text-[#6B6B76] ${subClassName ?? ''}`}
                >
                    {sub}
                </p>
            </MarkusCardContent>
        </MarkusCard>
    );
}
