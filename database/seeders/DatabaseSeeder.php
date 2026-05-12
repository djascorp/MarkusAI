<?php

namespace Database\Seeders;

use App\Models\Agent;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Djasnive RAJAONA',
            'email' => 'djasniveyrajaona@gmail.com',
        ]);

        $workspace = Workspace::factory()->create([
            'name' => 'MarkusAI Demo',
            'slug' => 'markusai-demo',
            'website_url' => 'https://markusai.com',
        ]);

        $workspace->users()->attach($user, ['role' => 'owner']);

        $this->seedDefaultAgents($workspace);
    }

    private function seedDefaultAgents(Workspace $workspace): void
    {
        $agents = [
            ['type' => 'seo', 'name' => 'SEO Agent', 'icon' => 'search', 'description' => 'Technical & Content SEO Optimizer'],
            ['type' => 'geo', 'name' => 'GEO Agent', 'icon' => 'bot', 'description' => 'Generative Engine Optimization'],
            ['type' => 'writer', 'name' => 'Writer Agent', 'icon' => 'file-text', 'description' => 'Long-form Content & Copy'],
            ['type' => 'reddit', 'name' => 'Reddit Agent', 'icon' => 'message-square', 'description' => 'Community Engagement'],
            ['type' => 'hn', 'name' => 'Hacker News Agent', 'icon' => 'share-2', 'description' => 'Tech Community Updates'],
            ['type' => 'x', 'name' => 'X (Twitter) Agent', 'icon' => 'share-2', 'description' => 'Micro-blogging & Threads'],
            ['type' => 'linkedin', 'name' => 'LinkedIn Agent', 'icon' => 'linkedin', 'description' => 'B2B Networking & Posts'],
            ['type' => 'coding', 'name' => 'Coding Agent', 'icon' => 'code', 'description' => 'Technical implementations'],
        ];

        foreach ($agents as $agent) {
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
