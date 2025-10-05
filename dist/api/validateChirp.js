import { respondWithJSON } from './json.js';
import { BadRequestError } from './errors.js';
const badWords = ["kerfuffle", "sharbert", "fornax"];
export async function validateChirpHandler(req, res) {
    const m = req.body;
    const message = m.body;
    if (message.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    }
    let cleanedMessage = message;
    for (const badWord of badWords) {
        const regex = new RegExp(`\\b${badWord}\\b`, 'gi');
        cleanedMessage = cleanedMessage.replace(regex, '****');
    }
    respondWithJSON(res, 200, { cleanedBody: cleanedMessage });
}
