import { db } from "../index.js";
import { asc, eq } from "drizzle-orm";
import { chirps } from "../schema.js";
export async function createChirp(chirp) {
    const [result] = await db
        .insert(chirps)
        .values(chirp)
        .returning();
    return result;
}
export async function getAllChirps() {
    return await db.query.chirps.findMany({
        orderBy: [asc(chirps.createdAt)],
    });
}
export async function getChirpById(chirpId) {
    return await db.select().from(chirps).where(eq(chirps.id, chirpId));
}
export async function deleteChirps(chirpId) {
    return await db
        .delete(chirps)
        .where(eq(chirps.id, chirpId));
}
