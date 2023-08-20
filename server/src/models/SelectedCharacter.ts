import mongoose from "mongoose";

export type SelectedCharacterDocument = mongoose.Document & {
    user_id:string,
    character_id:string
};

const selectedCharacterSchema = new mongoose.Schema<SelectedCharacterDocument>(
    {
        user_id:String,
        character_id:String
    },
    { timestamps: true },
);


export const SelectedCharacter = mongoose.model<SelectedCharacterDocument>("SelectedCharacter", selectedCharacterSchema);