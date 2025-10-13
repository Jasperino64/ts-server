import { respondWithJSON } from './json.js';
import { BadRequestError } from './errors.js';
import { createChirp, getAllChirps, getChirpById } from '../db/queries/chirps.js';
const badWords = ["kerfuffle", "sharbert", "fornax"];
export async function handlerChirpsCreate(req, res) {
    const params = req.body;
    if (!params.body || !params.userId) {
        throw new BadRequestError("Missing required fields");
    }
    const message = params.body;
    if (message.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    }
    let cleanedMessage = message;
    for (const badWord of badWords) {
        const regex = new RegExp(`\\b${badWord}\\b`, 'gi');
        cleanedMessage = cleanedMessage.replace(regex, '****');
    }
    const chirp = await createChirp({ body: cleanedMessage, userId: params.userId });
    if (!chirp) {
        throw new Error("Could not create chirp");
    }
    respondWithJSON(res, 201, chirp);
}
export async function handlerChirpsGetAll(_, res) {
    const chirps = await getAllChirps();
    respondWithJSON(res, 200, chirps);
}
export async function handlerChirpGetById(req, res) {
    const chirpId = req.params.chirpId;
    const chirp = await getChirpById(chirpId);
    if (!chirp) {
        throw new BadRequestError("Chirp not found");
    }
    respondWithJSON(res, 200, chirp);
}
