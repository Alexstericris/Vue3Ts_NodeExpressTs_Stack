export interface CharacterAttributes {
    color:string,
    size:number
}
export interface Position{
    xAxis:number,
    yAxis:number,
}

export interface Character{
    _id?:string,
    user_id?:string,
    position:Position
    attributes:CharacterAttributes
}

export interface CharactersCollection{
    [characterId:string]:Character
}