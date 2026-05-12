<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create(['email_verified_at' => now()]);
});

test('guests cannot access the marketing dashboard', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

test('the dashboard exposes the predefined CMO snapshot', function () {
    $this->actingAs($this->user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->where('metrics.healthScore.value', 84)
            ->where('metrics.organicTraffic.value', '5,100')
            ->has('trafficTrend', 7)
            ->has('priorityActions', 4)
            ->has('agentActivity', 4)
        );
});

test('the agents index lists every available agent', function () {
    $this->actingAs($this->user)
        ->get(route('agents.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('agents/index')
            ->has('agents', 8)
            ->where('agents.0.id', 'agent_seo')
            ->where('agents.0.name', 'SEO Agent')
        );
});

test('the agent detail returns the seeded SEO agent', function () {
    $this->actingAs($this->user)
        ->get(route('agents.show', ['agent' => 'agent_seo']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('agents/show')
            ->where('agent.id', 'agent_seo')
            ->where('agent.status', 'Active')
            ->has('agent.stats', 3)
            ->has('agent.currentTasks', 3)
        );
});

test('the agent detail rejects unknown identifiers', function () {
    $this->actingAs($this->user)
        ->get('/agents/unknown_agent')
        ->assertNotFound();
});

test('the content workflow exposes the draft list', function () {
    $this->actingAs($this->user)
        ->get(route('content.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('content/index')
            ->has('drafts', 4)
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
