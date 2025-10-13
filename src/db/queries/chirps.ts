import { db } from "../index.js";
import { asc, eq } from "drizzle-orm";
import { NewChirp, chirps } from "../schema.js";

export async function createChirp(chirp: NewChirp) {
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

export async function getChirpById(chirpId: string) {
  return await db.select().from(chirps).where(eq(chirps.id, chirpId));
}

export async function deleteChirps(chirpId: string) {
  return await db
    .delete(chirps)
    .where(eq(chirps.id, chirpId));
}