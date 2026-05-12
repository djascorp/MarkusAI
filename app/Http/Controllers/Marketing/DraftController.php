<?php

declare(strict_types=1);

namespace App\Http\Controllers\Marketing;

use App\Actions\Marketing\GenerateDraftAction;
use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Models\Draft;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

final class DraftController extends Controller
{
    public function generate(Request $request, GenerateDraftAction $action): RedirectResponse
    {
        $validated = $request->validate([
            'agent_id' => 'required|exists:agents,id',
            'title' => 'required|string|max:500',
            'type' => 'required|string|in:blog_post,social_post,email,reddit_comment,linkedin_article,landing_page,newsletter',
            'prompt' => 'required|string|max:5000',
            'target_channel' => 'nullable|string',
        ]);

        $workspace = $request->attributes->get('workspace');
        $agent = Agent::where('workspace_id', $workspace->id)
            ->where('id', $validated['agent_id'])
            ->firstOrFail();

        $action->execute(
            workspace: $workspace,
            agent: $agent,
            title: $validated['title'],
            type: $validated['type'],
            prompt: $validated['prompt'],
            targetChannel: $validated['target_channel'] ?? null,
        );

        return redirect()
            ->route('content.index')
            ->with('success', 'Draft generation started. The Writer Agent is working on it.');
    }

    public function approve(Request $request, int $draft): RedirectResponse
    {
        $workspace = $request->attributes->get('workspace');

        $draft = Draft::where('workspace_id', $workspace->id)
            ->where('id', $draft)
            ->firstOrFail();

        $draft->update(['status' => 'approved']);

        return redirect()
            ->route('content.index')
            ->with('success', 'Draft approved.');
    }

    public function reject(Request $request, int $draft): RedirectResponse
    {
        $workspace = $request->attributes->get('workspace');

        $draft = Draft::where('workspace_id', $workspace->id)
            ->where('id', $draft)
            ->firstOrFail();

        $draft->update(['status' => 'rejected']);

        return redirect()
            ->route('content.index')
            ->with('success', 'Draft rejected.');
    }
}
