export type Agent = {
    id: string;
    name: string;
    icon: string;
    description: string;
    status: 'Active' | 'Idle' | 'Alerting' | string;
    tasks: number;
};

export type AgentTask = {
    task: string;
    status: string;
    type: 'info' | 'warning' | 'success' | string;
};

export type AgentStat = {
    label: string;
    value: string;
};

export type AgentDetail = {
    id: string;
    name: string;
    description: string;
    status: string;
    stats: AgentStat[];
    currentTasks: AgentTask[];
};

export type Draft = {
    id: number;
    title: string;
    type: string;
    agent: string;
    status: string;
    date: string;
    score: number;
    scheduled: string | null;
};

export type DashboardSnapshot = {
    metrics: {
        healthScore: { value: number; delta: number };
        organicTraffic: { value: string; delta: string; weekly: number };
        drafts: { value: number; label: string };
        alerts: { value: number; critical: number; label: string };
    };
    trafficTrend: Array<{ name: string; organic: number; direct: number }>;
    priorityActions: Array<{
        title: string;
        agent: string;
        impact: string;
        time: string;
    }>;
    agentActivity: Array<{
        name: string;
        status: string;
        active: boolean;
        items: string;
    }>;
};

export type AnalyticsReport = {
    summary: {
        valueGenerated: string;
        conversions: { value: number; delta: string };
        interactions: { value: string; delta: string };
        cpa: { value: string; delta: string };
    };
    roiByChannel: Array<{ name: string; cost: number; return: number }>;
    attribution: Array<{ name: string; value: number; color: string }>;
    topContent: Array<{
        title: string;
        channel: string;
        views: string;
        conversions: number;
        status: string;
    }>;
};

export type OnboardingPayload = {
    agents: Array<{ name: string; optional: boolean }>;
    goals: Array<{ key: string; label: string; default: boolean }>;
};
