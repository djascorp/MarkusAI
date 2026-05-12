<?php

declare(strict_types=1);

namespace App\Http\Controllers\Marketing;

use App\Contracts\DraftRepositoryInterface;
use App\Data\Marketing\DraftData;
use App\Http\Controllers\Controller;
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

        return Inertia::render('content/index', [
            'drafts' => array_map(
                fn (DraftData $draft) => $draft->toArray(),
                $this->drafts->all($workspaceId),
            ),
        ]);
    }
}
