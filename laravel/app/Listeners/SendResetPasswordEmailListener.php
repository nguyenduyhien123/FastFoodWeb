<?php

namespace App\Listeners;

use App\Events\UserResetPasswordEvent;
use App\Mail\SendEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendResetPasswordEmailListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserResetPasswordEvent $event): void
    {
        Mail::to($event->info['to'])->send(new SendEmail($event->info));
    }
}
