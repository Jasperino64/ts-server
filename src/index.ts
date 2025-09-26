import express, {Request, Response} from "express";
import { handlerReadiness } from "./api/readiness.js";
import { logResponses } from "./middleware/logResponses.js";
import countFileServerHits from "./middleware/fileserverHits.js";
import { hits, resetHits } from "./api/hits.js";


const app = express();
const PORT = 8080;

app.use(logResponses);
app.use("/app", countFileServerHits, express.static("./src/app"));
app.get("/healthz", handlerReadiness);
app.get("/metrics", hits);
app.get("/reset", resetHits);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
