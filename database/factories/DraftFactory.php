<?php

namespace Database\Factories;

use App\Models\Agent;
use App\Models\Draft;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Draft>
 */
class DraftFactory extends Factory
{
    public function definition(): array
    {
        return [
            'workspace_id' => Workspace::factory(),
            'agent_id' => Agent::factory(),
            'title' => fake()->sentence(),
            'type' => fake()->randomElement(['blog_post', 'social_post', 'email', 'reddit_comment', 'linkedin_article']),
            'content' => fake()->paragraphs(5, true),
            'status' => fake()->randomElement(['draft', 'pending_review', 'approved', 'rejected', 'published']),
            'metadata' => ['word_count' => fake()->numberBetween(500, 3000)],
            'score' => fake()->numberBetween(60, 100),
        ];
    }
}
