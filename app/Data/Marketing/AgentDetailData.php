<?php

declare(strict_types=1);

namespace App\Data\Marketing;

/**
 * @phpstan-import-type AgentTaskArray from AgentTaskData
 *
 * @phpstan-type StatArray array{label: string, value: string}
 * @phpstan-type AgentDetailArray array{
 *     id: string,
 *     name: string,
 *     description: string,
 *     status: string,
 *     stats: list<StatArray>,
 *     currentTasks: list<AgentTaskArray>
 * }
 */
final readonly class AgentDetailData
{
    /**
     * @param  list<array{label: string, value: string}>  $stats
     * @param  list<AgentTaskData>  $currentTasks
     */
    public function __construct(
        public string $id,
        public string $name,
        public string $description,
        public string $status,
        public array $stats,
        public array $currentTasks,
    ) {}

    /**
     * @return AgentDetailArray
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'stats' => $this->stats,
            'currentTasks' => array_map(fn (AgentTaskData $task) => $task->toArray(), $this->currentTasks),
        ];
    }
}
