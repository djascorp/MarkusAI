<?php

declare(strict_types=1);

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

final class OnboardingController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('onboarding/index', [
            'agents' => [
                ['name' => 'SEO Agent', 'optional' => false],
                ['name' => 'Writer Agent', 'optional' => false],
                ['name' => 'Reddit Agent', 'optional' => false],
                ['name' => 'X Agent', 'optional' => false],
                ['name' => 'LinkedIn Agent', 'optional' => true],
            ],
            'goals' => [
                ['key' => 'search_traffic', 'label' => 'Search Traffic (SEO focus)', 'default' => true],
                ['key' => 'brand_awareness', 'label' => 'Brand Awareness', 'default' => false],
                ['key' => 'lead_generation', 'label' => 'Lead Generation', 'default' => true],
            ],
        ]);
    }
}
