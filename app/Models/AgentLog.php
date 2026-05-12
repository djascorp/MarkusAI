<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['workspace_id', 'agent_id', 'action', 'status', 'input', 'output', 'tokens_used', 'cost_cents', 'duration_ms'])]
class AgentLog extends Model
{
    public $timestamps = false;

    protected function casts(): array
    {
        return [
            'input' => 'array',
            'output' => 'array',
            'created_at' => 'datetime',
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
