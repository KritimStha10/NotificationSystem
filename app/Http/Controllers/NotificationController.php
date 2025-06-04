<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Jobs\PublishNotificationJob;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function store(Request $request)
    {
        $notification = Notification::create([
            'user_id' => $request->user_id,
            'message' => $request->message,
        ]);

        // Publish to RabbitMQ/Redis here (to be implemented)
        
        return response()->json(['message' => 'Notification queued', 'data' => $notification], 201);
    }

    public function recent()
    {
        return response()->json(Notification::orderBy('created_at', 'desc')->limit(10)->get());
    }

    public function summary()
    {
        return response()->json([
            'total_sent' => Notification::where('status', 'processed')->count(),
            'pending' => Notification::where('status', 'pending')->count(),
        ]);
    }
}
