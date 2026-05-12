<?php

declare(strict_types=1);

namespace App\Data\Marketing;

/**
 * Lightweight DTO describing a marketing AI agent shown in the UI.
 *
 * @phpstan-type AgentArray array{
 *     id: string,
 *     name: string,
 *     icon: string,
 *     description: string,
 *     status: string,
 *     tasks: int
 * }
 */
final readonly class AgentData
{
    public function __construct(
        public string $id,
        public string $name,
        public string $icon,
        public string $description,
        public string $status,
        public int $tasks,
    ) {}

    /**
     * @return AgentArray
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'icon' => $this->icon,
            'description' => $this->description,
            'status' => $this->status,
            'tasks' => $this->tasks,
        ];
    }
}
