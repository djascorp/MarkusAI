<?php

use App\Actions\Marketing\GenerateDraftAction;
use App\Jobs\Marketing\GenerateDraftJob;
use App\Models\Agent;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;

uses(RefreshDatabase::class);

test('generate draft action dispatches job with correct parameters', function () {
    Queue::fake();

    $user = User::factory()->create();
    $workspace = Workspace::factory()->create();
    $workspace->users()->attach($user, ['role' => 'owner']);
    $agent = Agent::create([
        'workspace_id' => $workspace->id,
        'type' => 'writer',
        'name' => 'Writer Agent',
        'icon' => 'file-text',
        'description' => 'Long-form Content',
        'status' => 'active',
    ]);

    $action = new GenerateDraftAction;
    $action->execute(
        workspace: $workspace,
        agent: $agent,
        title: 'Test Blog Post',
        type: 'blog_post',
        prompt: 'Write a blog post about AI marketing',
        targetChannel: 'blog',
    );

    Queue::assertPushed(GenerateDraftJob::class, function ($job) use ($workspace, $agent) {
        return $job->workspaceId === $workspace->id
            && $job->agentId === $agent->id
            && $job->title === 'Test Blog Post'
            && $job->type === 'blog_post'
            && $job->targetChannel === 'blog';
    });
});
