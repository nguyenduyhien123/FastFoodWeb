<?php

namespace App\Listeners;

use App\Events\UserRegisterEvent;
use App\Mail\SendEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendVerifyEmailListener
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
    // Xử lý sự kiện khi người dùng đăng ký tài khoản
    public function handle(UserRegisterEvent $event): void
    {
        Mail::to($event->info['to'])->send(new SendEmail($event->info));
    }
}
