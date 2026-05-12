<?php

declare(strict_types=1);

namespace App\Http\Controllers\Marketing;

use App\Actions\Marketing\GenerateDraftAction;
use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Models\Draft;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class DraftController extends Controller
{
    public function generate(Request $request, GenerateDraftAction $action): JsonResponse
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

        return response()->json([
            'message' => 'Draft generation started. The Writer Agent is working on it.',
        ], 202);
    }

    public function approve(Request $request, int $draft): JsonResponse
    {
        $workspace = $request->attributes->get('workspace');

        $draft = Draft::where('workspace_id', $workspace->id)
            ->where('id', $draft)
            ->firstOrFail();

        $draft->update(['status' => 'approved']);

        return response()->json([
            'message' => 'Draft approved.',
        ]);
    }

    public function reject(Request $request, int $draft): JsonResponse
    {
        $workspace = $request->attributes->get('workspace');

        $draft = Draft::where('workspace_id', $workspace->id)
            ->where('id', $draft)
            ->firstOrFail();

        $draft->update(['status' => 'rejected']);

        return response()->json([
            'message' => 'Draft rejected.',
        ]);
    }
}
