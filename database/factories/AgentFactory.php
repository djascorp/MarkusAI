<?php

namespace Database\Factories;

use App\Models\Agent;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Agent>
 */
class AgentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'workspace_id' => Workspace::factory(),
            'type' => fake()->randomElement(['seo', 'geo', 'writer', 'reddit', 'linkedin', 'x', 'hn', 'coding']),
            'name' => fake()->randomElement(['SEO Agent', 'GEO Agent', 'Writer Agent', 'Reddit Agent', 'LinkedIn Agent', 'X Agent', 'HN Agent', 'Coding Agent']),
            'description' => fake()->sentence(),
            'icon' => fake()->randomElement(['search', 'bot', 'file-text', 'message-square', 'linkedin', 'share-2', 'code']),
            'status' => fake()->randomElement(['active', 'idle', 'paused']),
        ];
    }
}
