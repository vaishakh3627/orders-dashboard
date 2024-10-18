<?php

namespace App\Http\Controllers;

use App\Models\UserLog;
use Illuminate\Http\Request;

class UserActivityController extends Controller
{
    public function getUserActivities($userId)
    {
        $activities = UserLog::where('user_id', $userId)
            ->orderBy('created_at', 'asc')
            ->get();

        if ($activities->isEmpty()) {
            return response()->json([
                'message' => 'No activities found for this user.',
            ], 404);
        }

        return response()->json([
            'message' => 'User activities retrieved successfully.',
            'data' => $activities,
        ], 201);
    }
}
