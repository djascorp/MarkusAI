<?php

namespace Database\Seeders;

use App\Models\Workspace;
use Illuminate\Database\Seeder;

class WorkspaceSeeder extends Seeder
{
    public function run(): void
    {
        $workspace = Workspace::factory()->create([
            'name' => 'MarkusAI Demo',
            'slug' => 'markusai-demo',
            'website_url' => 'https://markusai.com',
        ]);

        $this->callOnce(AgentSeeder::class);
    }
}
