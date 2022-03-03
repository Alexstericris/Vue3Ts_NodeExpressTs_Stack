import {Express, Request, Response} from "express";
import * as passportConfig from "../config/passport";
import * as apiController from "../controllers/ApiController";
import * as userController from "../controllers/UserController";

export const registerApiRoutes=(app:Express):void=>{
    app.get("/api", apiController.getApi);
    app.get("/api/users",userController.getUsers);
    app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
};