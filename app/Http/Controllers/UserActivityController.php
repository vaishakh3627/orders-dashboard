<?php

namespace App\Http\Controllers;

use App\Models\UserLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserActivityController extends Controller
{
    public function getUserActivities($userId)
    {

        $activities = UserLog::where('user_id', $userId)
        ->orderBy('created_at', 'desc')
        ->get();

        return Inertia::render('Activity',[
            'message' => 'User activities retrieved successfully.',
            'data' => $activities,
        ] );
    }
}
