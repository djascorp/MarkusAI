<?php

declare(strict_types=1);

namespace App\Http\Controllers\Marketing;

use App\Data\Marketing\AgentData;
use App\Http\Controllers\Controller;
use App\Services\Marketing\AgentCatalog;
use Inertia\Inertia;
use Inertia\Response;

final class AgentController extends Controller
{
    public function __construct(
        private readonly AgentCatalog $agents,
    ) {}

    public function index(): Response
    {
        return Inertia::render('agents/index', [
            'agents' => array_map(
                fn (AgentData $agent) => $agent->toArray(),
                $this->agents->all(),
            ),
        ]);
    }

    public function show(string $agent): Response
    {
        return Inertia::render('agents/show', [
            'agent' => $this->agents->find($agent)->toArray(),
        ]);
    }
}
