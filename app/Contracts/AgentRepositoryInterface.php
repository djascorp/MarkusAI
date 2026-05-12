<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Data\Marketing\AgentData;
use App\Data\Marketing\AgentDetailData;

interface AgentRepositoryInterface
{
    /**
     * @return list<AgentData>
     */
    public function all(int $workspaceId): array;

    public function find(int $workspaceId, string $agentId): AgentDetailData;
}
