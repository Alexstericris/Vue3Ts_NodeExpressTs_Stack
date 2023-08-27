import type {Character, CharacterAttributes, Position} from "@/types/gametypes";
import {useStore} from "@/stores/store";
import http from "@/axios";
// import {axiosGet, axiosPatch} from "@/axios";

export default class GameApi{
    static createCharacter(characterAttributes: CharacterAttributes) {
        const store=useStore()
        const character: Character = {
            attributes: characterAttributes,
            position: {xAxis: characterAttributes.size, yAxis: characterAttributes.size},
            user_id: store.user?._id
        };
        return http.post('/api/characters/create', {
            ...{character}
        });
    }

    static getCharacters() {
        return http.get('/api/characters/')
    }

    static updatePosition(_id:string|undefined,position:Position) {
        return http.patch('/api/characters/update/position',{
            ...{_id,position}
        })
    }

    static deleteCharacter(_id:string|undefined) {
        return http.delete('/api/characters/delete',{
            params:{
                _id
            }
        })
    }

    static getSelectedCharacter() {
        return http.get('/api/characters/selected')
    }

    static selectCharacter(_id:string|undefined) {
        return http.post('/api/characters/select', {
            _id
        })
    }
}