<?php

declare(strict_types=1);

namespace App\Data\Marketing;

/**
 * @phpstan-type DraftArray array{
 *     id: int,
 *     title: string,
 *     type: string,
 *     agent: string,
 *     status: string,
 *     date: string,
 *     score: int,
 *     scheduled: ?string
 * }
 */
final readonly class DraftData
{
    public function __construct(
        public int $id,
        public string $title,
        public string $type,
        public string $agent,
        public string $status,
        public string $date,
        public int $score,
        public ?string $scheduled = null,
    ) {}

    /**
     * @return DraftArray
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->type,
            'agent' => $this->agent,
            'status' => $this->status,
            'date' => $this->date,
            'score' => $this->score,
            'scheduled' => $this->scheduled,
        ];
    }
}
