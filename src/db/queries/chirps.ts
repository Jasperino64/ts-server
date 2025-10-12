import { db } from "../index.js";
import { desc } from "drizzle-orm";
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
    orderBy: [desc(chirps.createdAt)],
  });
}