<?php

declare(strict_types=1);

namespace App\Data\Marketing;

/**
 * @phpstan-type AgentTaskArray array{task: string, status: string, type: string}
 */
final readonly class AgentTaskData
{
    public function __construct(
        public string $task,
        public string $status,
        public string $type,
    ) {}

    /**
     * @return AgentTaskArray
     */
    public function toArray(): array
    {
        return [
            'task' => $this->task,
            'status' => $this->status,
            'type' => $this->type,
        ];
    }
}
