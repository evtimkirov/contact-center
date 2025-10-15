<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;
use App\Models\Contact;

class ContactCacheService
{
    /**
     * Time to live
     *
     * @var int $ttl
     */
    protected int $ttl = 300; // 5 minutes

    /**
     * Gets the contacts from DB or the cache
     *
     * @param int $id
     * @return array
     */
    public function getContact(int $id): array
    {
        $key    = "contact:{$id}";
        $cached = Redis::hgetall($key);

        if (!empty($cached)) {
            $cached['id'] = (int) $cached['id'];

            if (isset($cached['interactions'])) {
                $cached['interactions'] = json_decode($cached['interactions'], true);

                usort($cached['interactions'], fn($a, $b) => $b['id'] <=> $a['id']);
            }

            return array_merge(
                $cached,
                ['interactions' => $cached['interactions'] ?? []]
            );
        }

        // From DB if the cache record doesn't exist
        $contact = Contact::with(['interactions' => function ($query) {
            $query->orderBy('id', 'desc');
        }])->findOrFail($id);

        // New record with the contacts and integrations stored to the cache
        Redis::hmset($key, array_merge(
            $contact->toArray(),
            ['interactions' => json_encode($contact->interactions()->get()->toArray())]
        ));
        Redis::expire($key, $this->ttl);

        return $contact->toArray();
    }
}
