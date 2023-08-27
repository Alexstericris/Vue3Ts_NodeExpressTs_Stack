import type {Bullet, Character, CharactersCollection} from "@/types/gametypes";
import {defineStore} from "pinia";

export interface GameState {
    character: Character,
    selectedCharacter:Character,
    // otherCharacters: Array<Character>
    otherCharacters: CharactersCollection
    bullets: Array<Bullet>
    mouseX: number | null
    mouseY: number | null,
    clicked: boolean,
    clickX: number,
    clickY: number,
    gameStarted:boolean,
}

export const useGameStore= defineStore('game',{
    state:():GameState=>({
        character: {} as Character,
        otherCharacters:{},
        bullets: [],
        mouseX: null,
        mouseY: null,
        clicked: false,
        clickX: 0,
        clickY: 0,
        gameStarted: false,

        selectedCharacter: {} as Character,
    }),
    actions:{
        setClickCoordinates(state: GameState, coordinates: { clickX: number, clickY: number }) {
            state.clickX = coordinates.clickX
            state.clickY = coordinates.clickY
            state.clicked = true
        },
    }
})


// export const gameStore: Module<GameState, State> = {
//     namespaced: true,
//     state: {
//         character: {} as Character,
//         otherCharacters:[],
//         bullets: [],
//         mouseX: null,
//         mouseY: null,
//         clicked: false,
//         clickX: 0,
//         clickY: 0,
//         gameStarted: false,
//
//         selectedCharacter: {} as Character,
//     },
//     mutations: {
//         setGameStarted(state:GameState,gameStarted:boolean) {
//             state.gameStarted = gameStarted;
//         },
//         setCharacter(state: GameState, character: Character) {
//             state.character = character
//         },
//         setSelectedCharacter(state: GameState, character: Character) {
//             state.selectedCharacter = character
//         },
//         setCharacterPosition(state: GameState, position: Position) {
//             state.character.position = position;
//         },
//         setOtherCharacters(state: GameState,characters:Array<Character>) {
//             state.otherCharacters=characters
//         },
//         addBullet(state: GameState, bullet: Bullet) {
//             state.bullets.push(bullet)
//         },
//         deleteBullet(state: GameState, index: number) {
//             state.bullets=state.bullets.splice(index,1);
//             // state.bullets=state.bullets.filter(bullet=>bullet.id!==id);
//         },
//         setCoordinates(state: GameState, coordinates: { mouseX: number, mouseY: number }) {
//             state.mouseX = coordinates.mouseX
//             state.mouseY = coordinates.mouseY
//         },
//
//     }
// };