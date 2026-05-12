<?php

declare(strict_types=1);

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Services\Marketing\AnalyticsReport;
use Inertia\Inertia;
use Inertia\Response;

final class AnalyticsController extends Controller
{
    public function __construct(
        private readonly AnalyticsReport $report,
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('analytics/index', $this->report->build());
    }
}
