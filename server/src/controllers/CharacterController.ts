import {Request, Response} from "express";
import {check, validationResult} from "express-validator";
import {Character} from "../models/Character";
import logger from "../util/logger";
import {SelectedCharacter} from "../models/SelectedCharacter";

export default class CharacterController{
    static async createCharacter(req: Request, res: Response):Promise<void>{
        await check("character.attributes.color", "character").isLength({min: 3}).run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).send(errors);
            return;
        }

        const character = new Character(req.body.character);

        character.save((err, doc) => {
            if (err) {
                res.status(400).send(err);
                return;
            }
            logger.debug(doc);
            res.send(doc);
        });
    }

    static async getCharacters(req: Request, res: Response):Promise<void> {
        const characters = await Character.find({user_id:req.user._id});
        res.send(characters);
    }

    static async updatePosition(req:Request,res:Response):Promise<void>{
        await Character.updateOne({_id: req.body._id},{$set:{position:req.body.position}});
        res.send("position updated");
    }

    static async deleteCharacter(req:Request,res:Response):Promise<void> {
        await Character.deleteOne({_id:req.query._id});
        res.send("deleted character");
    }

    static async getSelectedCharacter(req:Request,res:Response) {
        const selectedCharacter=await SelectedCharacter.findOne({user_id:req.user._id}).exec();
        if (selectedCharacter === null) {
            await CharacterController.autoSelectFirstCharacter(req.user._id, res);
            return;
        }
        const character=await Character.findOne({_id:"64e13bf31b215701d245d852"}).exec();
        if (character===null) {
            await selectedCharacter?.delete();
            await CharacterController.autoSelectFirstCharacter(req.user._id, res);
            return;
        }
        res.send(character);
    }

    static async selectCharacter(req:Request,res:Response) {
        await SelectedCharacter.deleteMany({user_id:req.user._id});
        const newSelectedChar=new SelectedCharacter({user_id:req.user._id,character_id:req.body._id});
        newSelectedChar.save(async (err, doc) => {
            if (err) {
                res.status(400).send(err);
                return;
            }
            logger.debug(doc);
            const character=await Character.findOne({_id:doc.character_id});
            res.send(character);
        });
    }

    //helpers
    static async autoSelectFirstCharacter(user_id:string,res:Response) {
        const characters=await Character.find({user_id:user_id}).exec();
        if (characters.length) {
            const newSelectedChar=new SelectedCharacter({user_id:user_id,character_id:characters[0]._id});
            newSelectedChar.save(async (err, doc) => {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                logger.debug(doc);
                res.send(characters[0]);
            });
        }
    }
}