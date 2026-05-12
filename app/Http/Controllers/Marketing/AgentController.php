<?php

declare(strict_types=1);

namespace App\Http\Controllers\Marketing;

use App\Contracts\AgentRepositoryInterface;
use App\Data\Marketing\AgentData;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

final class AgentController extends Controller
{
    public function __construct(
        private readonly AgentRepositoryInterface $agents,
    ) {}

    public function index(): Response
    {
        $workspaceId = (int) request()->attributes->get('workspace')?->id;

        return Inertia::render('agents/index', [
            'agents' => array_map(
                fn (AgentData $agent) => $agent->toArray(),
                $this->agents->all($workspaceId),
            ),
        ]);
    }

    public function show(string $agent): Response
    {
        $workspaceId = (int) request()->attributes->get('workspace')?->id;

        return Inertia::render('agents/show', [
            'agent' => $this->agents->find($workspaceId, $agent)->toArray(),
        ]);
    }
}
