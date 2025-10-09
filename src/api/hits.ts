import type { Request, Response } from "express";
import {config} from "../config.js";

export async function hits(_: Request, res: Response) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.api.fileServerHits} times!</p>
  </body>
</html>
`);
}

export async function resetHits(_: Request, res: Response) {
  config.api.fileServerHits = 0;
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send(`"Hits reset"`);
}
