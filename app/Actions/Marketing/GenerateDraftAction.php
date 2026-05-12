<?php

declare(strict_types=1);

namespace App\Actions\Marketing;

use App\Jobs\Marketing\GenerateDraftJob;
use App\Models\Agent;
use App\Models\Workspace;

final class GenerateDraftAction
{
    public function execute(Workspace $workspace, Agent $agent, string $title, string $type, string $prompt, ?string $targetChannel = null): void
    {
        GenerateDraftJob::dispatch(
            workspaceId: $workspace->id,
            agentId: $agent->id,
            title: $title,
            type: $type,
            userPrompt: $prompt,
            targetChannel: $targetChannel,
        );
    }
}
