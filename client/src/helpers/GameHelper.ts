import type {Position} from "@/types/gametypes";

export default class GameHelper {
    static distance(p1: Position, p2: Position,ratio:number=1) {
        const b: number = (p1.xAxis - p2.xAxis)*ratio
        const c = (p1.yAxis - p2.yAxis)*ratio
        return Math.sqrt(b ** 2 + c ** 2)
    }
}