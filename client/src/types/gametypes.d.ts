export interface  CharacterAttributes {
    color: string,
    size: number,
    max_health_points:number,
    health_points:number,
}

export interface Character {
    id: string,
    user_id?: string,
    x_axis: number,
    y_axis: number,
    color: string,
    size: number,
    max_health_points: number,
    health_points: number,
    created_at?: string,
    updated_at?: string,
    selected?: boolean
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