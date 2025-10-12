import { db } from "../index.js";
import { desc } from "drizzle-orm";
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
        orderBy: [desc(chirps.createdAt)],
    });
}
