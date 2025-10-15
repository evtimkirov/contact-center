<?php

namespace App\Observers;

use App\Models\Contact;
use Illuminate\Support\Facades\Cache;

class ContactObserver
{
    /**
     * Set a JSON object with name and email when create a new contact
     *
     * @param Contact $contact
     * @return void
     */
    public function created(Contact $contact): void
    {
        Cache::hset("contact:{$contact->id}", 'name', $contact->name);
        Cache::hset("contact:{$contact->id}", 'email', $contact->email);
    }

    /**
     * Create/Update a JSON object with a changed "updated_at" param
     *
     * @param Contact $contact
     * @return void
     */
    public function updated(Contact $contact): void
    {
        Cache::hset("contact:{$contact->id}", 'updated_at', now());
    }

    /**
     * Delete the JSON object in delete the contact
     *
     * @param Contact $contact
     * @return void
     */
    public function deleted(Contact $contact): void
    {
        Cache::del("contact:{$contact->id}");
    }
}
