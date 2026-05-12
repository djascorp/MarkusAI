<?php

namespace App\Models;

use Database\Factories\AgentFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['workspace_id', 'type', 'name', 'description', 'icon', 'status', 'config', 'is_custom', 'last_run_at'])]
class Agent extends Model
{
    /** @use HasFactory<AgentFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'config' => 'array',
            'is_custom' => 'boolean',
            'last_run_at' => 'datetime',
        ];
    }

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class);
    }

    public function drafts(): HasMany
    {
        return $this->hasMany(Draft::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(AgentLog::class);
    }

    public function isStatus(string $status): bool
    {
        return $this->status === $status;
    }
}
