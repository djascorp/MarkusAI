<?php

declare(strict_types=1);

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Services\Marketing\DashboardMetrics;
use Inertia\Inertia;
use Inertia\Response;

final class DashboardController extends Controller
{
    public function __construct(
        private readonly DashboardMetrics $metrics,
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('dashboard', $this->metrics->snapshot());
    }
}
