<?php

use App\Models\Agent;
use App\Models\User;
use App\Models\Workspace;
use App\Repositories\EloquentAgentRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create(['email_verified_at' => now()]);
    $this->workspace = Workspace::factory()->create(['onboarding_completed' => true]);
    $this->workspace->users()->attach($this->user, ['role' => 'owner']);

    $this->agents = collect([
        Agent::create(['workspace_id' => $this->workspace->id, 'type' => 'seo', 'name' => 'SEO Agent', 'icon' => 'search', 'description' => 'Technical & Content SEO', 'status' => 'active']),
        Agent::create(['workspace_id' => $this->workspace->id, 'type' => 'writer', 'name' => 'Writer Agent', 'icon' => 'file-text', 'description' => 'Long-form Content', 'status' => 'idle']),
    ]);
});

test('all returns agent data for workspace', function () {
    $repository = new EloquentAgentRepository;

    $result = $repository->all($this->workspace->id);

    expect($result)->toHaveCount(2);
    expect($result[0]->name)->toBe('SEO Agent');
    expect($result[0]->status)->toBe('Active');
    expect($result[1]->name)->toBe('Writer Agent');
    expect($result[1]->status)->toBe('Idle');
});

test('all returns empty array for non-existent workspace', function () {
    $repository = new EloquentAgentRepository;

    $result = $repository->all(9999);

    expect($result)->toHaveCount(0);
});

test('find returns agent detail with stats', function () {
    $seoAgent = $this->agents->first();
    $repository = new EloquentAgentRepository;

    $result = $repository->find($this->workspace->id, (string) $seoAgent->id);

    expect($result->name)->toBe('SEO Agent');
    expect($result->stats)->toHaveCount(3);
});

test('find throws model not found for invalid agent', function () {
    $repository = new EloquentAgentRepository;

    $repository->find($this->workspace->id, '9999');
})->throws(ModelNotFoundException::class);

test('agents index returns agents from database', function () {
    $this->actingAs($this->user)
        ->get(route('agents.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('agents/index')
            ->has('agents', 2)
            ->where('agents.0.name', 'SEO Agent')
        );
});

test('agents show returns agent detail from database', function () {
    $agentId = $this->agents->first()->id;

    $this->actingAs($this->user)
        ->get(route('agents.show', ['agent' => $agentId]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('agents/show')
            ->where('agent.name', 'SEO Agent')
            ->has('agent.stats', 3)
        );
});
