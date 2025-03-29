import type {Character, CharacterAttributes} from "@/types/gametypes";
import {useStore} from "@/stores/store";
import http from "@/fetchWrapper";

export default class GameApi{
    static createCharacter(characterAttributes: CharacterAttributes) {
        const store=useStore()
        const character: Character = {
            id:'',
            color: characterAttributes.color,
            size: characterAttributes.size,
            max_health_points: characterAttributes.max_health_points,
            health_points: characterAttributes.health_points,
            x_axis: characterAttributes.size,
            y_axis: characterAttributes.size,
            user_id: store.user?.id
        };
        return http.post('/api/characters/create', {
            ...{character}
        });
    }

    static getCharacters() {
        return http.get('/api/characters/')
    }

    static updatePosition(id:string|undefined,character:Character) {
        return http.post('/api/characters/update',{
            ...{id,character}
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