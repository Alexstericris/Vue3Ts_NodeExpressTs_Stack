import {Express, Request, Response} from "express";
import * as passportConfig from "../config/passport";
import * as apiController from "../controllers/ApiController";
import * as userController from "../controllers/UserController";
import CharacterController from "../controllers/CharacterController";
import {authRouter} from "./auth";

export const registerApiRoutes = (app: Express): void => {
    app.get("/api", apiController.getApi);
    app.get("/api/users", userController.getUsers);
    app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

    app.use("/api/characters",authRouter);
    app.post("/api/characters/create", CharacterController.createCharacter);
    app.get("/api/characters", CharacterController.getCharacters);
    app.patch("/api/characters/update/position", CharacterController.updatePosition);
};