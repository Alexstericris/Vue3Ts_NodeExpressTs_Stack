import passport from "passport";
import express, {Express, NextFunction, Request, Response} from "express";
import * as UserController from "../controllers/UserController";
import * as userController from "../controllers/UserController";
import {clientLogin} from "../controllers/UserController";
import jwt, {JwtPayload} from "jsonwebtoken";
import {JWT_SECRET} from "../util/secrets";

export const authRouter = express.Router();
authRouter.use((req: Request, res: Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, JWT_SECRET, (err, jwt_payload:JwtPayload) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = jwt_payload.user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
});

export const registerAuthRoutes = (app: Express): void => {
    app.use("/auth",authRouter);
    app.post("/auth/user",UserController.getAuthUser);
    app.post("/client/login", userController.clientLogin);
    app.post("/client/register", userController.clientRegister);

    /**
     * OAuth authentication routes. (Sign in)
     */
    app.get("/auth/facebook", passport.authenticate("facebook", {scope: ["email", "public_profile"]}));
    app.get("/auth/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/login"}), (req: Request, res: Response) => {
        res.redirect(req.session.returnTo || "/");
    });
};