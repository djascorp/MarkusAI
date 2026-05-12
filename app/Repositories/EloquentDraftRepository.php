<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\DraftRepositoryInterface;
use App\Data\Marketing\DraftData;
use App\Models\Draft;

final class EloquentDraftRepository implements DraftRepositoryInterface
{
    public function all(int $workspaceId): array
    {
        return Draft::where('workspace_id', $workspaceId)
            ->with('agent')
            ->latest()
            ->get()
            ->map(fn (Draft $draft) => new DraftData(
                id: $draft->id,
                title: $draft->title,
                type: str_replace('_', ' ', ucfirst($draft->type)),
                agent: $draft->agent->name ?? 'Unknown',
                status: str_replace('_', ' ', ucfirst($draft->status)),
                date: $draft->created_at->diffForHumans(),
                score: $draft->metadata['score'] ?? 0,
                scheduled: $draft->scheduled_at?->format('M d, h:i A'),
            ))
            ->all();
    }
}
