import {Socket,RemoteSocket} from "socket.io";
import {CharacterDocument} from "../models/Character";

export interface CharacterSocket extends Socket {
    character: CharacterDocument
}

export interface CharacterRemoteSocket extends RemoteSocket<any,any> {
    character:CharacterDocument
}

export interface CharactersCollection{
    [characterId:string]:CharacterDocument
}