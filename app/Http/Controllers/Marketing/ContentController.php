<?php

declare(strict_types=1);

namespace App\Http\Controllers\Marketing;

use App\Contracts\DraftRepositoryInterface;
use App\Data\Marketing\DraftData;
use App\Http\Controllers\Controller;
use App\Models\Agent;
use Inertia\Inertia;
use Inertia\Response;

final class ContentController extends Controller
{
    public function __construct(
        private readonly DraftRepositoryInterface $drafts,
    ) {}

    public function __invoke(): Response
    {
        $workspaceId = (int) request()->attributes->get('workspace')?->id;

        $agents = Agent::where('workspace_id', $workspaceId)
            ->orderBy('name')
            ->get()
            ->map(fn (Agent $agent) => ['id' => $agent->id, 'name' => $agent->name])
            ->all();

        return Inertia::render('content/index', [
            'agents' => $agents,
            'drafts' => array_map(
                fn (DraftData $draft) => $draft->toArray(),
                $this->drafts->all($workspaceId),
            ),
        ]);
    }
}
