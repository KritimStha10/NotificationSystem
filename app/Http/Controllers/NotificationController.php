<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Jobs\PublishNotificationJob;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function store(Request $req)
    {
        $req->validate(['user_id'=>'required|integer','payload'=>'nullable|array']);
        $hourlyCount = Notification::where('user_id', $req->user_id)
            ->where('created_at','>=', now()->subHour())
            ->count();
        if ($hourlyCount >= 10) {
            return response()->json(['error'=>'Rate limit exceeded'], 429);
        }
        $notif = Notification::create([
            'user_id'=>$req->user_id,
            'message'=>$req->message,
        ]);
        dispatch(new PublishNotificationJob($notif));
        return response()->json($notif, 201);
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
