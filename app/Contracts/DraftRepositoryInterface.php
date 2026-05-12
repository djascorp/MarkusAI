<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Data\Marketing\DraftData;

interface DraftRepositoryInterface
{
    /**
     * @return list<DraftData>
     */
    public function all(int $workspaceId): array;
}
