import type {Character, CharacterAttributes, Position} from "@/types/gametypes";
import axios from "@/axios";
import {store} from "@/stores/store";

export default class GameApi {
    static createCharacter(characterAttributes: CharacterAttributes) {
        const character: Character = {
            attributes: characterAttributes,
            position: {xAxis: characterAttributes.size, yAxis: characterAttributes.size},
            user_id: store.state.user?._id
        };
        return axios.post('/api/characters/create', {
            ...{character}
        });
    }

    static getCharacters() {
        return axios.get('/api/characters/')
    }

    static updatePosition(_id:string|undefined,position:Position) {
        return axios.patch('/api/characters/update/position',{
            ...{_id,position}
        })
    }
}