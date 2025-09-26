import type { Request, Response } from "express";
import config from "../config.js";

export async function hits(_: Request, res: Response) {
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send(`Hits: ${config.fileseverHits}`);
}

export async function resetHits(_: Request, res: Response) {
  config.fileseverHits = 0;
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send("Hits reset");
}
