export interface  CharacterAttributes {
    color: string,
    size: number,
    max_health_points:number,
    health_points:number,
}

export interface Position {
    xAxis: number,
    yAxis: number,
}

export interface Character {
    id?: string,
    userid?: string,
    position: Position
    attributes: CharacterAttributes,
    isHit?:boolean
}

export interface Bullet {
    color: string,
    characterid?: string,
    size: number,
    xAxis: number,
    yAxis: number,
    xVelocity:number,
    yVelocity:number,
    xTo: number,
    yTo: number,
    damage:number,
}

export interface CharactersCollection {
    [characterId: string]: Character
}