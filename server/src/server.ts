import errorHandler from "errorhandler";
import app from "./app";
import {registerSocketIo} from "./ioserver";
import logger from "./util/logger";


/**
 * Error Handler. Provides full stack
 */
// if (process.env.NODE_ENV === "development") {
app.use(errorHandler());
// }


/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    logger.debug(`App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`)
    console.log(
        "App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export const ioserver=registerSocketIo(server);