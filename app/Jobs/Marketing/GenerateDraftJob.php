<?php

namespace App\Jobs\Marketing;

use App\Models\Agent;
use App\Models\AgentLog;
use App\Models\Workspace;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Laravel\Ai\AiManager;
use Laravel\Ai\Prompts\AgentPrompt;

class GenerateDraftJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $backoff = 30;

    public int $timeout = 120;

    public function __construct(
        public int $workspaceId,
        public int $agentId,
        public string $title,
        public string $type,
        public string $userPrompt,
        public ?string $targetChannel = null,
    ) {}

    public function handle(AiManager $ai): void
    {
        $workspace = Workspace::find($this->workspaceId);
        $agent = Agent::find($this->agentId);

        if ($workspace === null || $agent === null) {
            return;
        }

        $agentLog = AgentLog::create([
            'workspace_id' => $workspace->id,
            'agent_id' => $agent->id,
            'action' => 'generate_draft',
            'status' => 'running',
            'input' => ['title' => $this->title, 'type' => $this->type, 'prompt' => $this->userPrompt],
        ]);

        $startTime = now();

        try {
            $systemPrompt = $this->buildSystemPrompt($workspace, $agent);

            $response = $ai->textProvider()->prompt(
                new AgentPrompt(
                    agent: \Laravel\Ai\agent($systemPrompt),
                    prompt: $this->userPrompt,
                    provider: $ai->textProvider(),
                    model: $ai->textProvider()->defaultTextModel(),
                    timeout: 120,
                ),
            );

            $content = $response->text;
            $tokensUsed = $response->usage->promptTokens + $response->usage->completionTokens;

            $draft = $workspace->drafts()->create([
                'agent_id' => $agent->id,
                'title' => $this->title,
                'type' => $this->type,
                'content' => $content,
                'status' => 'pending_review',
                'metadata' => [
                    'word_count' => str_word_count(strip_tags($content)),
                    'tokens_used' => $tokensUsed,
                    'model' => $ai->textProvider()->defaultTextModel(),
                    'score' => 0,
                ],
                'target_channel' => $this->targetChannel,
            ]);

            $agentLog->update([
                'status' => 'success',
                'output' => ['draft_id' => $draft->id],
                'tokens_used' => $tokensUsed,
                'duration_ms' => $startTime->diffInMilliseconds(now()),
            ]);

            $agent->update(['last_run_at' => now()]);

        } catch (\Throwable $e) {
            $agentLog->update([
                'status' => 'error',
                'output' => ['error' => $e->getMessage()],
                'duration_ms' => $startTime->diffInMilliseconds(now()),
            ]);

            Log::error('GenerateDraftJob failed', [
                'workspace_id' => $this->workspaceId,
                'agent_id' => $this->agentId,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    private function buildSystemPrompt(Workspace $workspace, Agent $agent): string
    {
        $tone = $workspace->tone_of_voice ?? 'professional yet accessible';
        $audience = $workspace->target_audience ?? 'SaaS founders and indie hackers';

        return "You are {$agent->name}, an AI marketing agent for {$workspace->name}. "
            ."Your mission: {$agent->description}. "
            ."Tone of voice: {$tone}. "
            ."Target audience: {$audience}. "
            ."Generate high-quality content following the user's instructions. "
            .'Use clear formatting with headings, bullet points, and actionable insights.';
    }
}
