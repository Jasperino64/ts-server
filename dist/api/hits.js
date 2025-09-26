import config from "../config.js";
export async function hits(_, res) {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(`Hits: ${config.fileseverHits}`);
}
export async function resetHits(_, res) {
    config.fileseverHits = 0;
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("Hits reset");
}
