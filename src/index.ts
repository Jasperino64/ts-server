import express, {Request, Response} from "express";
import { handlerReadiness } from "./api/readiness.js";
import { logResponses } from "./middleware/logResponses.js";
import countFileServerHits from "./middleware/fileserverHits.js";
import { hits, resetHits } from "./api/hits.js";
import { validateChirpHandler } from "./api/validateChirp.js";

const app = express();
const PORT = 8080;

app.use(logResponses);
app.use("/app", countFileServerHits, express.static("./src/app"));
app.use(express.json());
app.get("/api/healthz", handlerReadiness);
app.post("/api/validate_chirp", validateChirpHandler)
app.get("/admin/metrics", hits);
app.post("/admin/reset", resetHits);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
