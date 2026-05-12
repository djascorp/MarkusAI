<?php

use App\Models\Agent;
use App\Models\Draft;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create(['email_verified_at' => now()]);
    $this->workspace = Workspace::factory()->create(['onboarding_completed' => true]);
    $this->workspace->users()->attach($this->user, ['role' => 'owner']);

    $this->defaultAgents = collect([
        Agent::create(['workspace_id' => $this->workspace->id, 'type' => 'seo', 'name' => 'SEO Agent', 'icon' => 'search', 'description' => 'Technical & Content SEO Optimizer', 'status' => 'active']),
        Agent::create(['workspace_id' => $this->workspace->id, 'type' => 'geo', 'name' => 'GEO Agent', 'icon' => 'bot', 'description' => 'Generative Engine Optimization', 'status' => 'active']),
        Agent::create(['workspace_id' => $this->workspace->id, 'type' => 'writer', 'name' => 'Writer Agent', 'icon' => 'file-text', 'description' => 'Long-form Content & Copy', 'status' => 'active']),
        Agent::create(['workspace_id' => $this->workspace->id, 'type' => 'reddit', 'name' => 'Reddit Agent', 'icon' => 'message-square', 'description' => 'Community Engagement', 'status' => 'active']),
        Agent::create(['workspace_id' => $this->workspace->id, 'type' => 'hn', 'name' => 'Hacker News Agent', 'icon' => 'share-2', 'description' => 'Tech Community Updates', 'status' => 'active']),
        Agent::create(['workspace_id' => $this->workspace->id, 'type' => 'x', 'name' => 'X (Twitter) Agent', 'icon' => 'share-2', 'description' => 'Micro-blogging & Threads', 'status' => 'idle']),
        Agent::create(['workspace_id' => $this->workspace->id, 'type' => 'linkedin', 'name' => 'LinkedIn Agent', 'icon' => 'linkedin', 'description' => 'B2B Networking & Posts', 'status' => 'idle']),
        Agent::create(['workspace_id' => $this->workspace->id, 'type' => 'coding', 'name' => 'Coding Agent', 'icon' => 'code', 'description' => 'Technical implementations', 'status' => 'idle']),
    ]);
});

test('guests cannot access the marketing dashboard', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

test('the dashboard exposes the CMO snapshot', function () {
    $this->actingAs($this->user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('metrics')
            ->has('trafficTrend')
            ->has('priorityActions')
            ->has('agentActivity')
        );
});

test('the agents index lists all seeded agents', function () {
    $this->actingAs($this->user)
        ->get(route('agents.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('agents/index')
            ->has('agents', 8)
        );
});

test('the agent detail returns a seeded agent', function () {
    $seoAgent = $this->defaultAgents->firstWhere('type', 'seo');

    $this->actingAs($this->user)
        ->get(route('agents.show', ['agent' => $seoAgent->id]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('agents/show')
            ->where('agent.name', 'SEO Agent')
            ->has('agent.stats', 3)
        );
});

test('the agent detail rejects non-existent agents', function () {
    $this->actingAs($this->user)
        ->get('/agents/9999')
        ->assertNotFound();
});

test('the content workflow exposes the draft list from database', function () {
    $writerAgent = $this->defaultAgents->firstWhere('type', 'writer');
    Draft::create([
        'workspace_id' => $this->workspace->id,
        'agent_id' => $writerAgent->id,
        'title' => 'How Generative AI is Changing SEO in 2026',
        'type' => 'blog_post',
        'content' => 'Full article content...',
        'status' => 'pending_review',
    ]);

    $this->actingAs($this->user)
        ->get(route('content.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('content/index')
            ->has('drafts', 1)
            ->where('drafts.0.title', 'How Generative AI is Changing SEO in 2026')
        );
});

test('the analytics view exposes the report payload', function () {
    $this->actingAs($this->user)
        ->get(route('analytics.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('analytics/index')
            ->where('summary.valueGenerated', '$2,700')
            ->has('roiByChannel', 5)
            ->has('attribution', 4)
            ->has('topContent', 3)
        );
});

test('the onboarding view exposes goals and agents', function () {
    $this->actingAs($this->user)
        ->get(route('onboarding.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('onboarding/index')
            ->has('agents', 5)
            ->has('goals', 3)
        );
});
