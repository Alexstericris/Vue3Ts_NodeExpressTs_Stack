
export default class GameHelper {
    static distance(p1_x_axis: number, p1_y_axis: number,p2_x_axis: number,p2_y_axis: number, ratio: number = 1) {
        const b: number = (p1_x_axis - p2_x_axis) * ratio
        const c = (p1_y_axis - p2_y_axis) * ratio
        return Math.sqrt(b ** 2 + c ** 2)
    }
}