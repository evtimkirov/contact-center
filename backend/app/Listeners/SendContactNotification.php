<?php

namespace App\Listeners;

use App\Events\ContactCreatedEvent;
use Illuminate\Support\Facades\Log;

class SendContactNotification
{
    /**
     * Handle the event.
     *
     * @param ContactCreatedEvent $event
     * @return void
     */
    public function handle(ContactCreatedEvent $event): void
    {
        Log::info('The contacts have been successfully imported.');

        // Sending here...
    }
}
