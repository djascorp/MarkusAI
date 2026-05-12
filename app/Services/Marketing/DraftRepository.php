<?php

declare(strict_types=1);

namespace App\Services\Marketing;

use App\Data\Marketing\DraftData;

final class DraftRepository
{
    /**
     * @return list<DraftData>
     */
    public function all(): array
    {
        return [
            new DraftData(
                id: 1,
                title: 'How Generative AI is Changing SEO in 2026',
                type: 'Blog Post',
                agent: 'Writer Agent',
                status: 'Pending Review',
                date: 'Just now',
                score: 92,
            ),
            new DraftData(
                id: 2,
                title: 'Comment: "What\'s your go-to marketing stack?"',
                type: 'Reddit Reply',
                agent: 'Reddit Agent',
                status: 'Pending Review',
                date: '10m ago',
                score: 98,
            ),
            new DraftData(
                id: 3,
                title: 'Is your startup missing out on GEO? Here is why...',
                type: 'LinkedIn Post',
                agent: 'LinkedIn Agent',
                status: 'Needs Edits',
                date: '1h ago',
                score: 75,
            ),
            new DraftData(
                id: 4,
                title: 'Product Update v2.4 Newsletter',
                type: 'Email',
                agent: 'Writer Agent',
                status: 'Approved',
                date: '3h ago',
                score: 88,
                scheduled: 'May 14, 09:00 AM',
            ),
        ];
    }
}
