<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\AuthController;

Route::prefix('v1')->group(function () {
    // Login
    Route::post('/login', [AuthController::class, 'login']);

    // Sanctum protected
    Route::middleware('auth:sanctum')->group(function () {
        // Auth part
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'currentUser']);

        // Contact API endpoints
        Route::apiResource('contacts', ContactController::class);
    });
});
