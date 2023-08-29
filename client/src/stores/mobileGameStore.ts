import type {Bullet, Character, CharactersCollection} from "@/types/gametypes";
import {defineStore} from "pinia";

export interface MobileGameState {
    // otherCharacters: Array<Character>
    clicked: boolean,
    clickX: number,
    clickY: number,
}

export const useMobileGameStore= defineStore('mobileGame',{
    state:():MobileGameState=>({
        clicked: false,
        clickX: 0,
        clickY: 0
    }),
    actions:{
        setClickCoordinates(state: MobileGameState, coordinates: { clickX: number, clickY: number }) {
            state.clickX = coordinates.clickX
            state.clickY = coordinates.clickY
            state.clicked = true
        },
    }
})