import { hash, verify } from "argon2";
import jwt from "jsonwebtoken";
import { BadRequestError, UserNotAuthenticatedError } from "./api/errors.js";
const TOKEN_ISSUER = "chirpy";
export async function hashPassword(password) {
    return await hash(password);
}
export async function checkPasswordHash(password, hash) {
    if (!password)
        return false;
    try {
        return await verify(hash, password);
    }
    catch {
        return false;
    }
}
export function makeJWT(userID, expiresIn, secret) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + expiresIn;
    const token = jwt.sign({
        iss: TOKEN_ISSUER,
        sub: userID,
        iat: issuedAt,
        exp: expiresAt,
    }, secret, { algorithm: "HS256" });
    return token;
}
export function validateJWT(tokenString, secret) {
    let decoded;
    try {
        decoded = jwt.verify(tokenString, secret);
    }
    catch (e) {
        throw new UserNotAuthenticatedError("Invalid token");
    }
    if (decoded.iss !== TOKEN_ISSUER) {
        throw new UserNotAuthenticatedError("Invalid issuer");
    }
    if (!decoded.sub) {
        throw new UserNotAuthenticatedError("No user ID in token");
    }
    return decoded.sub;
}
export function getBearerToken(req) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        throw new BadRequestError("Missing or invalid Authorization header");
    }
    return extractBearerToken(authHeader);
}
export function extractBearerToken(authHeader) {
    const parts = authHeader.split(" ");
    if (parts.length < 2 || parts[0] !== "Bearer") {
        throw new BadRequestError("Missing or invalid Authorization header");
    }
    return parts[1];
}
