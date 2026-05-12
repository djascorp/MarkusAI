<?php

namespace App\Models;

use Database\Factories\DraftFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['workspace_id', 'agent_id', 'title', 'type', 'content', 'status', 'metadata', 'target_channel', 'published_at', 'scheduled_at'])]
class Draft extends Model
{
    /** @use HasFactory<DraftFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'published_at' => 'datetime',
            'scheduled_at' => 'datetime',
        ];
    }

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class);
    }

    public function agent(): BelongsTo
    {
        return $this->belongsTo(Agent::class);
    }
}
