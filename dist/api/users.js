import { BadRequestError, UserNotAuthenticatedError } from "./errors.js";
import { respondWithJSON } from "./json.js";
import { createUser } from "../db/queries/users.js";
import { hashPassword, checkPasswordHash } from "./auth.js";
import { getUserByEmail } from "../db/queries/users.js";
export async function handlerUsersCreate(req, res) {
    const params = req.body;
    if (!params.email || !params.password) {
        throw new BadRequestError("Missing required fields");
    }
    const hashedPassword = await hashPassword(params.password);
    const user = await createUser({ hashedPassword, email: params.email });
    if (!user) {
        throw new Error("Could not create user");
    }
    const userResponse = { id: user.id, createdAt: user.createdAt, updatedAt: user.updatedAt, email: user.email };
    respondWithJSON(res, 201, user);
}
export async function handlerUsersLogin(req, res) {
    const params = req.body;
    if (!params.email || !params.password) {
        throw new BadRequestError("Missing required fields");
    }
    const user = await getUserByEmail(params.email);
    if (!user) {
        throw new BadRequestError("Invalid email or password");
    }
    const validPassword = await checkPasswordHash(params.password, user.hashedPassword);
    if (!validPassword) {
        throw new UserNotAuthenticatedError("Invalid email or password");
    }
    const userResponse = { id: user.id, createdAt: user.createdAt, updatedAt: user.updatedAt, email: user.email };
    respondWithJSON(res, 200, userResponse);
}
