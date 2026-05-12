<?php

declare(strict_types=1);

namespace App\Services\LLM;

use Illuminate\Support\Facades\Http;

final class OpenAIClient
{
    public function __construct(
        private readonly string $apiKey,
        private readonly string $model = 'gpt-4o-mini',
        private readonly string $baseUrl = 'https://api.openai.com/v1',
    ) {}

    public function generate(string $systemPrompt, string $userPrompt, int $maxTokens = 4096): array
    {
        $startTime = now();

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$this->apiKey,
            'Content-Type' => 'application/json',
        ])
            ->post("{$this->baseUrl}/chat/completions", [
                'model' => $this->model,
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $userPrompt],
                ],
                'max_tokens' => $maxTokens,
                'temperature' => 0.7,
            ])
            ->throw();

        $data = $response->json();

        return [
            'content' => $data['choices'][0]['message']['content'] ?? '',
            'tokens_used' => ($data['usage']['prompt_tokens'] ?? 0) + ($data['usage']['completion_tokens'] ?? 0),
            'model' => $data['model'] ?? $this->model,
            'duration_ms' => $startTime->diffInMilliseconds(now()),
        ];
    }
}
