<?php

namespace App\Console\Commands;

use App\Jobs\ImportContactsJob;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class SyncContactsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-contacts-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync the user contacts.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $lock = Cache::lock('contact-sync', 300); // 5 minutes

        if ($lock->get()) {
            try {
                ImportContactsJob::dispatch();

                $this->info('Contacts synced successfully.');
            } finally {
                $lock->release();
            }
        } else {
            $this->warn('The process is already running.');
        }
    }
}
