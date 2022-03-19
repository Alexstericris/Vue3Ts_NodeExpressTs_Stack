import {Request, Response} from "express";
import {check, validationResult} from "express-validator";
import {Character} from "../models/Character";
import logger from "../util/logger";
import {User} from "../models/User";
import {ioserver} from "../server";

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
}