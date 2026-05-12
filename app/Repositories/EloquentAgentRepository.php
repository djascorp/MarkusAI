<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AgentRepositoryInterface;
use App\Data\Marketing\AgentData;
use App\Data\Marketing\AgentDetailData;
use App\Data\Marketing\AgentTaskData;
use App\Models\Agent;

final class EloquentAgentRepository implements AgentRepositoryInterface
{
    public function all(int $workspaceId): array
    {
        return Agent::where('workspace_id', $workspaceId)
            ->get()
            ->map(fn (Agent $agent) => new AgentData(
                id: (string) $agent->id,
                name: $agent->name,
                icon: $agent->icon,
                description: $agent->description ?? '',
                status: ucfirst($agent->status),
                tasks: $agent->drafts()->where('status', 'pending_review')->count(),
            ))
            ->all();
    }

    public function find(int $workspaceId, string $agentId): AgentDetailData
    {
        $agent = Agent::where('workspace_id', $workspaceId)
            ->where('id', $agentId)
            ->firstOrFail();

        $draftsCount = $agent->drafts()->count();
        $publishedCount = $agent->drafts()->where('status', 'published')->count();
        $pendingCount = $agent->drafts()->where('status', 'pending_review')->count();

        $recentTasks = $agent->logs()
            ->latest('created_at')
            ->limit(5)
            ->get()
            ->map(fn ($log) => new AgentTaskData(
                task: $log->action,
                status: ucfirst($log->status),
                type: match ($log->status) {
                    'running' => 'info',
                    'success' => 'success',
                    'warning' => 'warning',
                    'error' => 'warning',
                    default => 'info',
                },
            ))
            ->all();

        return new AgentDetailData(
            id: (string) $agent->id,
            name: $agent->name,
            description: $agent->description ?? '',
            status: ucfirst($agent->status),
            stats: [
                ['label' => 'Drafts Generated', 'value' => (string) $draftsCount],
                ['label' => 'Published', 'value' => (string) $publishedCount],
                ['label' => 'Pending Review', 'value' => (string) $pendingCount],
            ],
            currentTasks: $recentTasks,
        );
    }
}
