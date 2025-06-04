<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Notification;
use Illuminate\Foundation\Queue\Queueable;

class PublishNotificationJob implements ShouldQueue
{
   use Queueable, InteractsWithQueue, SerializesModels;

    public $notification;

    public function __construct(Notification $notification)
    {
        $this->notification = $notification;
    }

    public function handle()
    {
        // Here, publish the notification to RabbitMQ or Redis
        // Example: Using Redis
        \Illuminate\Support\Facades\Redis::publish('notifications', json_encode($this->notification));
    }
}
