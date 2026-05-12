<?php

use App\Http\Controllers\Marketing\AgentController;
use App\Http\Controllers\Marketing\AnalyticsController;
use App\Http\Controllers\Marketing\ContentController;
use App\Http\Controllers\Marketing\DashboardController;
use App\Http\Controllers\Marketing\OnboardingController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('agents', [AgentController::class, 'index'])->name('agents.index');
    Route::get('agents/{agent}', [AgentController::class, 'show'])
        ->whereIn('agent', [
            'agent_seo',
            'agent_geo',
            'agent_writer',
            'agent_reddit',
            'agent_hn',
            'agent_x',
            'agent_linkedin',
            'agent_coding',
        ])
        ->name('agents.show');

    Route::get('content', ContentController::class)->name('content.index');
    Route::get('analytics', AnalyticsController::class)->name('analytics.index');
    Route::get('onboarding', OnboardingController::class)->name('onboarding.index');
});

require __DIR__.'/settings.php';
