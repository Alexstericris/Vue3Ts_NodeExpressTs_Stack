<?php

use App\Http\Controllers\CharacterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return auth()->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/broadcasting/auth', function (\Illuminate\Http\Request $request) {
        return Broadcast::auth($request);
    });

    Route::post('/characters/create', [CharacterController::class, 'create']);
    Route::get('/characters/', [CharacterController::class, 'index']);
    Route::post('/characters/update', [CharacterController::class, 'update']);
    Route::delete('/characters/delete', [CharacterController::class, 'destroy']);
    Route::get('/characters/selected', [CharacterController::class, 'selected']);
    Route::post('/characters/select', [CharacterController::class, 'select']);
});
