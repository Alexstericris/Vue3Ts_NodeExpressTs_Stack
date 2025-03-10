import type {Character, CharacterAttributes, Position} from "@/types/gametypes";
import {useStore} from "@/stores/store";
import http from "@/fetchWrapper";

export default class GameApi{
    static createCharacter(characterAttributes: CharacterAttributes) {
        const store=useStore()
        const character: Character = {
            attributes: characterAttributes,
            position: {xAxis: characterAttributes.size, yAxis: characterAttributes.size},
            userid: store.user?.id
        };
        return http.post('/api/characters/create', {
            ...{character}
        });
    }

    static getCharacters() {
        return http.get('/api/characters/')
    }

    static updatePosition(id:string|undefined,position:Position) {
        return http.patch('/api/characters/update/position',{
            ...{id,position}
        })
    }

    static deleteCharacter(id:string|undefined) {
        return http.delete('/api/characters/delete',{
            params:{
                id
            }
        })
    }

    static getSelectedCharacter() {
        return http.get('/api/characters/selected')
    }

    static selectCharacter(id:string|undefined) {
        return http.post('/api/characters/select', {
            id
        })
    }
}