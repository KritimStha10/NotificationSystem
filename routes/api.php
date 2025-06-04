<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\NotificationController;

Route::post('/notifications', [NotificationController::class, 'store']);
Route::get('/notifications/recent', [NotificationController::class, 'recent']);
Route::get('/notifications/summary', [NotificationController::class, 'summary']);
