<?php

namespace App\Models;

use Database\Factories\WorkspaceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'slug', 'website_url', 'tone_of_voice', 'target_audience', 'brand_voice_profile', 'product_profile', 'competitor_benchmarks', 'primary_goals', 'priority_channels', 'onboarding_completed'])]
class Workspace extends Model
{
    /** @use HasFactory<WorkspaceFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'brand_voice_profile' => 'array',
            'product_profile' => 'array',
            'competitor_benchmarks' => 'array',
            'primary_goals' => 'array',
            'priority_channels' => 'array',
            'onboarding_completed' => 'boolean',
        ];
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'workspace_users')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function agents(): HasMany
    {
        return $this->hasMany(Agent::class);
    }

    public function drafts(): HasMany
    {
        return $this->hasMany(Draft::class);
    }

    public function agentLogs(): HasMany
    {
        return $this->hasMany(AgentLog::class);
    }
}
