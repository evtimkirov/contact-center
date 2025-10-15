<?php

namespace App\Jobs;

use App\Models\Contact;
use App\Events\ContactCreatedEvent;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ImportContactsJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info('Contact importing...');

        // Simulation
        for ($i = 1; $i <= 5; $i++) {
            $contact = Contact::create([
                'name'  => "Demo Contact {$i}",
                'email' => "contact{$i}@example.com",
            ]);

            event(new ContactCreatedEvent($contact));
        }

        Log::info('The contacts have been successfully imported.');
    }
}
