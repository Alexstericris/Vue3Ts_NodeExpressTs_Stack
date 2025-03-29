<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class CharacterController extends Controller
{
    public function index(Request $request){
        return $request->user()->characters;
    }
    public function create(Request $request){
        return $request->user()->characters()->create($request->get('character'));
    }
    public function update(Request $request){
        $character = Character::find($request->get('id'));
        if (!$character) {
            throw new ModelNotFoundException();
        }
        $character->update($request->get('character'));
        return $character;
    }
    public function destroy(Request $request){
        return Character::destroy($request->get('id'));
    }
    public function selected(Request $request){
        return $request->user()->characters()->where('selected',true)->first();
    }
    public function select(Request $request){
        $character = Character::find($request->get('id'));
        if (!$character) {
            throw new ModelNotFoundException();
        }
        $character->update(['selected' => true]);
        return $character;
    }
}
