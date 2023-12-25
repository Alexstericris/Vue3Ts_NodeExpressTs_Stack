import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import bluebird from "bluebird";
import {MONGODB_URI, SESSION_SECRET} from "./util/secrets";
import cors from "cors";

//Register Routes
import {registerWebRoutes} from "./routes/web";
import {registerApiRoutes} from "./routes/api";
import {registerAuthRoutes} from "./routes/auth";
import process from "process";

// Create Express server
const app = express();

// Connect to MongoDB
// console.log("My Env" + JSON.stringify(process.env));
// console.log(MONGODB_URI);
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    },
).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    // process.exit();
});

// Express configuration1
app.set("port", process.env.PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongoUrl,
        mongoOptions: {
            autoReconnect: true
        }
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user &&
        req.path !== "/login" &&
        req.path !== "/signup" &&
        !req.path.match(/^\/auth/) &&
        !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    } else if (req.user &&
        req.path == "/account") {
        req.session.returnTo = req.path;
    }
    next();
});

app.use(
    express.static(path.join(__dirname, "public"), {maxAge: 31557600000})
);
app.use(cors({origin: process.env.FRONTEND_URL}));


/**
 * Primary app routes.
 */
registerWebRoutes(app);
registerApiRoutes(app);
registerAuthRoutes(app);

export default app;
