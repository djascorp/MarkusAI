<?php

use App\Actions\Marketing\GenerateDraftAction;
use App\Jobs\Marketing\GenerateDraftJob;
use App\Models\Agent;
use App\Models\Draft;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create(['email_verified_at' => now()]);
    $this->workspace = Workspace::factory()->create(['onboarding_completed' => true]);
    $this->workspace->users()->attach($this->user, ['role' => 'owner']);
    $this->agent = Agent::create([
        'workspace_id' => $this->workspace->id,
        'type' => 'writer',
        'name' => 'Writer Agent',
        'icon' => 'file-text',
        'description' => 'Long-form Content',
        'status' => 'active',
    ]);
});

test('generate dispatches job', function () {
    Queue::fake();

    $action = new GenerateDraftAction;
    $action->execute(
        workspace: $this->workspace,
        agent: $this->agent,
        title: 'Test Article',
        type: 'blog_post',
        prompt: 'Write a test article about AI marketing',
    );

    Queue::assertPushed(GenerateDraftJob::class, 1);
    Queue::assertPushed(GenerateDraftJob::class, function ($job) {
        return $job->title === 'Test Article'
            && $job->type === 'blog_post'
            && $job->workspaceId === $this->workspace->id
            && $job->agentId === $this->agent->id;
    });
});

test('draft generate endpoint requires authentication', function () {
    $this->post(route('drafts.generate'), [
        'agent_id' => $this->agent->id,
        'title' => 'Test',
        'type' => 'blog_post',
        'prompt' => 'Test prompt',
    ])->assertRedirect(route('login'));
});

test('draft generate endpoint validates input', function () {
    $this->actingAs($this->user)
        ->post(route('drafts.generate'), [])
        ->assertSessionHasErrors(['agent_id', 'title', 'type', 'prompt']);
});

test('draft generate endpoint dispatches job', function () {
    Queue::fake();

    $this->actingAs($this->user)
        ->post(route('drafts.generate'), [
            'agent_id' => $this->agent->id,
            'title' => 'Test Article',
            'type' => 'blog_post',
            'prompt' => 'Write about AI',
        ])
        ->assertStatus(202);

    Queue::assertPushed(GenerateDraftJob::class);
});

test('draft approve endpoint updates status', function () {
    $draft = Draft::create([
        'workspace_id' => $this->workspace->id,
        'agent_id' => $this->agent->id,
        'title' => 'Test Draft',
        'type' => 'blog_post',
        'content' => 'Test content',
        'status' => 'pending_review',
    ]);

    $this->actingAs($this->user)
        ->post(route('drafts.approve', ['draft' => $draft->id]))
        ->assertOk();

    expect($draft->fresh()->status)->toBe('approved');
});

test('draft reject endpoint updates status', function () {
    $draft = Draft::create([
        'workspace_id' => $this->workspace->id,
        'agent_id' => $this->agent->id,
        'title' => 'Test Draft',
        'type' => 'blog_post',
        'content' => 'Test content',
        'status' => 'pending_review',
    ]);

    $this->actingAs($this->user)
        ->post(route('drafts.reject', ['draft' => $draft->id]))
        ->assertOk();

    expect($draft->fresh()->status)->toBe('rejected');
});

test('content index shows drafts from database', function () {
    Draft::create([
        'workspace_id' => $this->workspace->id,
        'agent_id' => $this->agent->id,
        'title' => 'AI Marketing Guide',
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
            ->where('drafts.0.title', 'AI Marketing Guide')
        );
});
