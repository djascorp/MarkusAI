<?php

declare(strict_types=1);

namespace App\Services\Marketing;

use App\Data\Marketing\AgentData;
use App\Data\Marketing\AgentDetailData;
use App\Data\Marketing\AgentTaskData;

/**
 * Static catalogue of marketing agents shown across the MarkusAI UI.
 *
 * For now this is an in-memory source; it can later be swapped for an
 * Eloquent-backed repository without changing the controllers.
 */
final class AgentCatalog
{
    /**
     * @return list<AgentData>
     */
    public function all(): array
    {
        return [
            new AgentData('agent_seo', 'SEO Agent', 'search', 'Technical & Content SEO Optimizer', 'Active', 3),
            new AgentData('agent_geo', 'GEO Agent', 'bot', 'Generative Engine Optimization', 'Active', 1),
            new AgentData('agent_writer', 'Writer Agent', 'file-text', 'Long-form Content & Copy', 'Active', 4),
            new AgentData('agent_reddit', 'Reddit Agent', 'message-square', 'Community Engagement', 'Alerting', 0),
            new AgentData('agent_hn', 'Hacker News Agent', 'share-2', 'Tech Community Updates', 'Active', 1),
            new AgentData('agent_x', 'X (Twitter) Agent', 'share-2', 'Micro-blogging & Threads', 'Idle', 0),
            new AgentData('agent_linkedin', 'LinkedIn Agent', 'linkedin', 'B2B Networking & Posts', 'Idle', 0),
            new AgentData('agent_coding', 'Coding Agent', 'code', 'Technical implementations', 'Idle', 0),
        ];
    }

    public function find(string $id): AgentDetailData
    {
        return match ($id) {
            'agent_seo' => new AgentDetailData(
                id: 'agent_seo',
                name: 'SEO Agent',
                description: 'Technical & Content SEO Optimizer',
                status: 'Active',
                stats: [
                    ['label' => 'Pages Crawled', 'value' => '1,240'],
                    ['label' => 'Issues Fixed', 'value' => '34'],
                    ['label' => 'Backlinks Monitored', 'value' => '128'],
                ],
                currentTasks: [
                    new AgentTaskData('Analyzing keyword cannibalization on /blog', 'In Progress', 'info'),
                    new AgentTaskData('Missing schema markup on 12 product pages', 'Fix Ready', 'warning'),
                    new AgentTaskData('Updated XML sitemap', 'Completed', 'success'),
                ],
            ),
            'agent_writer' => new AgentDetailData(
                id: 'agent_writer',
                name: 'Writer Agent',
                description: 'Long-form Content & Copy Generator',
                status: 'Active',
                stats: [
                    ['label' => 'Words Generated', 'value' => '45,000'],
                    ['label' => 'Drafts Awaiting', 'value' => '4'],
                    ['label' => 'Published', 'value' => '12'],
                ],
                currentTasks: [
                    new AgentTaskData('Drafting "Q3 Product Update" email', 'In Progress', 'info'),
                    new AgentTaskData('A/B testing hooks for Landing Page', 'Paused', 'warning'),
                    new AgentTaskData('Generated 3 case studies', 'Completed', 'success'),
                ],
            ),
            'agent_reddit' => new AgentDetailData(
                id: 'agent_reddit',
                name: 'Reddit Agent',
                description: 'Community Engagement & Monitoring',
                status: 'Alerting',
                stats: [
                    ['label' => 'Subreddits', 'value' => '15'],
                    ['label' => 'Mentions Found', 'value' => '42'],
                    ['label' => 'Replies Drafted', 'value' => '8'],
                ],
                currentTasks: [
                    new AgentTaskData('High-momentum thread in r/SaaS about pricing', 'Needs Reply', 'warning'),
                    new AgentTaskData('Monitoring r/startups for keywords', 'Active', 'info'),
                    new AgentTaskData('Replied to user feedback on r/webdev', 'Published', 'success'),
                ],
            ),
            default => $this->placeholder($id),
        };
    }

    private function placeholder(string $id): AgentDetailData
    {
        $shortName = str_replace('agent_', '', $id);

        return new AgentDetailData(
            id: $id,
            name: strtoupper($shortName).' Agent',
            description: 'Specialized Marketing AI',
            status: 'Idle',
            stats: [
                ['label' => 'Uptime', 'value' => '99.9%'],
                ['label' => 'Actions taken', 'value' => '0'],
                ['label' => 'ROI Contribution', 'value' => '$0'],
            ],
            currentTasks: [
                new AgentTaskData('Awaiting configuration', 'Pending', 'warning'),
            ],
        );
    }
}
