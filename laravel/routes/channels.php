<?php

use App\Models\Character;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id;
});

Broadcast::channel('game.{id}', function (User $user, $id) {
    $character = $user->characters()->where('selected', true)->first();
    if (!$character) {
        $character = $user->characters()->first();
    }
    return ['id' => $user->id, 'user' => $user, 'character' => $character];
});
