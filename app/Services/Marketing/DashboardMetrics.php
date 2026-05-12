<?php

declare(strict_types=1);

namespace App\Services\Marketing;

/**
 * Aggregates the predefined metrics shown on the CMO dashboard.
 *
 * The data is intentionally static today; this seam is the place where
 * real Eloquent queries / external integrations will plug in later.
 */
final class DashboardMetrics
{
    /**
     * @return array{
     *     metrics: array{
     *         healthScore: array{value: int, delta: int},
     *         organicTraffic: array{value: string, delta: string, weekly: int},
     *         drafts: array{value: int, label: string},
     *         alerts: array{value: int, critical: int, label: string}
     *     },
     *     trafficTrend: list<array{name: string, organic: int, direct: int}>,
     *     priorityActions: list<array{title: string, agent: string, impact: string, time: string}>,
     *     agentActivity: list<array{name: string, status: string, active: bool, items: string}>
     * }
     */
    public function snapshot(): array
    {
        return [
            'metrics' => [
                'healthScore' => ['value' => 84, 'delta' => 2],
                'organicTraffic' => ['value' => '5,100', 'delta' => '+21%', 'weekly' => 890],
                'drafts' => ['value' => 12, 'label' => 'Need your approval to publish'],
                'alerts' => ['value' => 4, 'critical' => 1, 'label' => 'Check opportunities on Reddit'],
            ],
            'trafficTrend' => [
                ['name' => 'Jan', 'organic' => 1200, 'direct' => 400],
                ['name' => 'Feb', 'organic' => 1900, 'direct' => 450],
                ['name' => 'Mar', 'organic' => 2100, 'direct' => 500],
                ['name' => 'Apr', 'organic' => 2800, 'direct' => 520],
                ['name' => 'May', 'organic' => 3400, 'direct' => 600],
                ['name' => 'Jun', 'organic' => 4200, 'direct' => 650],
                ['name' => 'Jul', 'organic' => 5100, 'direct' => 700],
            ],
            'priorityActions' => [
                ['title' => 'Publish "State of SaaS" report', 'agent' => 'Writer Agent', 'impact' => 'High Traffic', 'time' => '5m review'],
                ['title' => 'Reply to HN trending thread', 'agent' => 'HN Agent', 'impact' => 'High intent', 'time' => 'Immediate'],
                ['title' => 'Fix 3 broken backlinks', 'agent' => 'SEO Agent', 'impact' => 'Ranking boost', 'time' => 'Auto-fix'],
                ['title' => 'Schedule X thread on "Bootstrapping"', 'agent' => 'X Agent', 'impact' => 'Engagement', 'time' => 'Ready'],
            ],
            'agentActivity' => [
                ['name' => 'SEO Agent', 'status' => 'Crawling site', 'active' => true, 'items' => '24 pages'],
                ['name' => 'Writer Agent', 'status' => 'Drafting blog post', 'active' => true, 'items' => '"AI in 2026"'],
                ['name' => 'Reddit Agent', 'status' => 'Monitoring 12 subs', 'active' => true, 'items' => '3 alerts'],
                ['name' => 'LinkedIn Agent', 'status' => 'Idle', 'active' => false, 'items' => 'Scheduled for 3PM'],
            ],
        ];
    }
}
