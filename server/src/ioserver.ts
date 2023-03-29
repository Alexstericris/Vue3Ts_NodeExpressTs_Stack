import {Server} from "socket.io";
import * as http from "http";
import jwt, {JwtPayload} from "jsonwebtoken";
import {JWT_SECRET} from "./util/secrets";
import {Character, CharacterDocument, Position} from "./models/Character";
import {CharacterRemoteSocket, CharactersCollection, CharacterSocket} from "game";

export const registerSocketIo = (server: http.Server): Server => {
    const ioserver = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"],
            // allowedHeaders: ["x-schubwerk-token"],
            // credentials: falsey
        }
    });

    ioserver.use(function (socket, next) {
        const auth = socket.handshake.auth;
        if (auth?.token) {
            const token = auth.token.split(" ")[1];
            jwt.verify(token, JWT_SECRET, (err: any, jwt_payload: JwtPayload) => {
                if (err) {
                    return new Error("thou shall not pass!");
                }
                next();
            });
        } else {
            return new Error("who is thee?");
        }

    });
    
    ioserver.on("connection",(socket:CharacterSocket) => {
        socket.on("pendingGameJoin", async (character: CharacterDocument) => {
            console.log("player joined");
            if (!character) {
                return;
            }
            socket.character = character;
            socket.join("room1");
            const playersInRoom = await ioserver.sockets.in("room1").fetchSockets();
            const characters:CharactersCollection = {};
            playersInRoom.forEach((characterRemoteSocket:CharacterRemoteSocket) => {
                characters[characterRemoteSocket.character._id] = characterRemoteSocket.character;
            });
            // console.log(ioserver.sockets.adapter.rooms.get("room1"));
            // console.log(ioserver.sockets.sockets.get(ioserver.sockets.adapter.rooms.get("room1").values().next().value));
           ioserver.in("room1").emit("playerJoined",characters);
        });
        socket.on("playerLeft", (character: CharacterDocument) => {
            ioserver.to("room1").emit("playerLeft", character);
        });
        socket.on("positionUpdated",async (characterId:string,position:Position)=>{
            console.log("player moved");
            Character.updateOne({_id: characterId}, {$set: {position: position}})
                .then((val) => {
                        console.log("position updated");
                    },
                    (err) => {
                        console.log(err);
                    });
            socket.broadcast.to("room1").emit("positionUpdated", characterId, position);

        });
        socket.on("disconnect",()=>{
            console.log("player disconnected");
        });
        socket.on("shootBullet", (bullet:any) => {
            console.log("shootBullet");
            ioserver.to("room1").emit("shootBullet",bullet);
        });
    });

    return ioserver;
};
