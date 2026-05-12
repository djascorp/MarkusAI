<?php

declare(strict_types=1);

namespace App\Services\Marketing;

final class AnalyticsReport
{
    /**
     * @return array{
     *     summary: array{
     *         valueGenerated: string,
     *         conversions: array{value: int, delta: string},
     *         interactions: array{value: string, delta: string},
     *         cpa: array{value: string, delta: string}
     *     },
     *     roiByChannel: list<array{name: string, cost: int, return: int}>,
     *     attribution: list<array{name: string, value: int, color: string}>,
     *     topContent: list<array{title: string, channel: string, views: string, conversions: int, status: string}>
     * }
     */
    public function build(): array
    {
        return [
            'summary' => [
                'valueGenerated' => '$2,700',
                'conversions' => ['value' => 124, 'delta' => '+12% vs last month'],
                'interactions' => ['value' => '14.2k', 'delta' => '+3% vs last month'],
                'cpa' => ['value' => '$0.80', 'delta' => '-15% vs last month'],
            ],
            'roiByChannel' => [
                ['name' => 'SEO', 'cost' => 120, 'return' => 850],
                ['name' => 'X / Twitter', 'cost' => 80, 'return' => 340],
                ['name' => 'LinkedIn', 'cost' => 150, 'return' => 620],
                ['name' => 'Reddit', 'cost' => 45, 'return' => 210],
                ['name' => 'Hacker News', 'cost' => 20, 'return' => 680],
            ],
            'attribution' => [
                ['name' => 'Organic Search', 'value' => 45, 'color' => '#D4AF37'],
                ['name' => 'Social', 'value' => 30, 'color' => '#0ea5e9'],
                ['name' => 'Direct', 'value' => 15, 'color' => '#10b981'],
                ['name' => 'Referral', 'value' => 10, 'color' => '#f59e0b'],
            ],
            'topContent' => [
                [
                    'title' => 'Show HN: We replaced our marketing team with AI',
                    'channel' => 'Hacker News',
                    'views' => '45,200',
                    'conversions' => 68,
                    'status' => 'Active',
                ],
                [
                    'title' => 'The Ultimate Guide to Bootstrapping in 2026',
                    'channel' => 'Blog (SEO)',
                    'views' => '12,400',
                    'conversions' => 42,
                    'status' => 'Published',
                ],
                [
                    'title' => 'Thread: How I structure my prompts for marketing',
                    'channel' => 'X (Twitter)',
                    'views' => '8,100',
                    'conversions' => 14,
                    'status' => 'Published',
                ],
            ],
        ];
    }
}
