import request from "supertest";
import app from "../src/app";
import logger from "../src/util/logger";

// describe("GET /api/create/character", () => {
//     it("should return stored characters", (done) => {
//         request(app).get("/api/create/character")
//             .send({
//
//             })
//             .expect(200).end((err,res) => {
//             logger.debug(res);
//             done();
//         });
//     });
// });

describe("GET /api/characters", () => {
    it("should return stored characters", (done) => {
        request(app).get("/api/characters")
            .expect(200).end((err,res) => {
            logger.debug(res.body);
            done();
        });
    });
});