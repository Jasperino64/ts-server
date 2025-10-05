import { Request, Response, NextFunction } from "express";
import { respondWithError } from "../json.js";
import { BadRequestError, NotFoundError, UserForbiddenError, UserNotAuthenticatedError } from "../errors.js";
export function errorMiddleWare(
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction,
) {
  let statusCode = 500;
  let message = "Something went wrong on our end";
  if (err instanceof BadRequestError) {
    statusCode = 400;
    message = err.message;
  } else if (err instanceof NotFoundError) {
    statusCode = 404;
    message = err.message;
  } else if (err instanceof UserForbiddenError) {
    statusCode = 403;
    message = err.message;
  } else if (err instanceof UserNotAuthenticatedError) {
    statusCode = 401;
    message = err.message;
  }
  console.log(err.message);

  respondWithError(res, statusCode, message);
}
