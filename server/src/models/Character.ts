import mongoose from "mongoose";

export interface Position{xAxis:number,yAxis:number}

export type CharacterDocument = mongoose.Document & {
    user_id:string,
    position:Position,
    attributes:{
        color:string,
        size:number,
        max_health_points:number,
        health_points:number,
    }
};

const characterSchema = new mongoose.Schema<CharacterDocument>(
    {
        user_id:String,
        position:{
            xAxis:Number,
            yAxis:Number
        },
        attributes:{
            color:String,
            size:Number,
            max_health_points: {type:Number,default:100},
            health_points: {type:Number,default:100},
        }
    },
    { timestamps: true },
);


export const Character = mongoose.model<CharacterDocument>("Character", characterSchema);