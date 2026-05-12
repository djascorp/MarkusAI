<?php

use Laravel\Ai\AiManager;

test('zai is configured as default ai provider', function () {
    expect(config('ai.default'))->toBe('zai');
});

test('zai provider uses openai driver with zai base url', function () {
    $zaiConfig = config('ai.providers.zai');

    expect($zaiConfig)->not->toBeNull()
        ->and($zaiConfig['driver'])->toBe('openai')
        ->and($zaiConfig['url'])->toStartWith('https://api.z.ai/')
        ->and($zaiConfig['key'])->not->toBeEmpty();
});

test('zai provider has glm-4.7 as default text model', function () {
    $zaiConfig = config('ai.providers.zai');

    expect($zaiConfig['models']['text']['default'])->toBe('glm-4.7');
});

test('zai provider can be resolved by ai manager', function () {
    $provider = app(AiManager::class)->textProvider('zai');

    expect($provider)->not->toBeNull()
        ->and($provider->defaultTextModel())->toBe('glm-4.7');
});

test('default ai provider resolves to zai', function () {
    $provider = app(AiManager::class)->textProvider();

    expect($provider->defaultTextModel())->toBe('glm-4.7');
});
