<?php

namespace Database\Seeders;

use App\Models\Agent;
use App\Models\Workspace;
use Illuminate\Database\Seeder;

class AgentSeeder extends Seeder
{
    private const DEFAULT_AGENTS = [
        ['type' => 'seo', 'name' => 'SEO Agent', 'icon' => 'search', 'description' => 'Technical & Content SEO Optimizer'],
        ['type' => 'geo', 'name' => 'GEO Agent', 'icon' => 'bot', 'description' => 'Generative Engine Optimization'],
        ['type' => 'writer', 'name' => 'Writer Agent', 'icon' => 'file-text', 'description' => 'Long-form Content & Copy'],
        ['type' => 'reddit', 'name' => 'Reddit Agent', 'icon' => 'message-square', 'description' => 'Community Engagement'],
        ['type' => 'hn', 'name' => 'Hacker News Agent', 'icon' => 'share-2', 'description' => 'Tech Community Updates'],
        ['type' => 'x', 'name' => 'X (Twitter) Agent', 'icon' => 'share-2', 'description' => 'Micro-blogging & Threads'],
        ['type' => 'linkedin', 'name' => 'LinkedIn Agent', 'icon' => 'linkedin', 'description' => 'B2B Networking & Posts'],
        ['type' => 'coding', 'name' => 'Coding Agent', 'icon' => 'code', 'description' => 'Technical implementations'],
    ];

    public function run(): void
    {
        $workspace = Workspace::first();

        if ($workspace === null) {
            return;
        }

        foreach (self::DEFAULT_AGENTS as $agent) {
            Agent::firstOrCreate(
                ['workspace_id' => $workspace->id, 'type' => $agent['type']],
                [
                    'name' => $agent['name'],
                    'icon' => $agent['icon'],
                    'description' => $agent['description'],
                    'status' => 'idle',
                ],
            );
        }
    }
}
