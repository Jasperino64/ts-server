import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { logResponses } from "./api/middleware/logResponses.js";
import countFileServerHits from "./api/middleware/fileserverHits.js";
import { hits, resetHits } from "./api/hits.js";
import { validateChirpHandler } from "./api/validateChirp.js";
import { errorMiddleWare } from "./api/middleware/errorMiddleware.js";
const app = express();
const PORT = 8080;
app.use(logResponses);
app.use("/app", countFileServerHits, express.static("./src/app"));
app.use(express.json());
app.get("/api/healthz", (req, res, next) => {
    Promise.resolve(handlerReadiness(req, res)).catch(next);
});
app.post("/api/validate_chirp", (req, res, next) => {
    Promise.resolve(validateChirpHandler(req, res)).catch(next);
});
app.get("/admin/metrics", (req, res, next) => {
    Promise.resolve(hits(req, res)).catch(next);
});
app.post("/admin/reset", (req, res, next) => {
    Promise.resolve(resetHits(req, res)).catch(next);
});
// Error handling middleware needs to be defined last, after other app.use() and routes.
app.use(errorMiddleWare);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
// postgres://postgres:postgres@localhost:5432/chirpy
