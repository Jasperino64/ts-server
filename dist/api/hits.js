import config from "../config.js";
export async function hits(_, res) {
    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.fileseverHits} times!</p>
  </body>
</html>
`);
}
export async function resetHits(_, res) {
    config.fileseverHits = 0;
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(`"Hits reset"`);
}
