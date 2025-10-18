import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { logResponses } from "./api/middleware/logResponses.js";
import countFileServerHits from "./api/middleware/fileserverHits.js";
import { hits } from "./api/hits.js";
import { handlerChirpsCreate, handlerChirpsGetAll, handlerChirpGetById } from "./api/chirps.js";
import { errorMiddleWare } from "./api/middleware/errorMiddleware.js";
import { handlerUsersCreate } from "./api/users.js";
import { handlerLogin } from "./api/auth.js";
import { handlerReset } from "./api/reset.js";
const app = express();
const PORT = 8080;
app.use(logResponses);
app.use("/app", countFileServerHits, express.static("./src/app"));
app.use(express.json());
app.get("/api/healthz", (req, res, next) => {
    Promise.resolve(handlerReadiness(req, res)).catch(next);
});
app.post("/api/chirps", (req, res, next) => {
    Promise.resolve(handlerChirpsCreate(req, res)).catch(next);
});
app.get("/api/chirps/:chirpId", (req, res, next) => {
    Promise.resolve(handlerChirpGetById(req, res)).catch(next);
});
app.get("/api/chirps", (req, res, next) => {
    Promise.resolve(handlerChirpsGetAll(req, res)).catch(next);
});
app.get("/admin/metrics", (req, res, next) => {
    Promise.resolve(hits(req, res)).catch(next);
});
app.post("/admin/reset", (req, res, next) => {
    Promise.resolve(handlerReset(req, res)).catch(next);
});
app.post("/api/users", (req, res, next) => {
    Promise.resolve(handlerUsersCreate(req, res)).catch(next);
});
app.post("/api/login", (req, res, next) => {
    Promise.resolve(handlerLogin(req, res)).catch(next);
});
// Error handling middleware needs to be defined last, after other app.use() and routes.
app.use(errorMiddleWare);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
// postgres://postgres:postgres@localhost:5432/chirpy
