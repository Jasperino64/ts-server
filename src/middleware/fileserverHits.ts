import {Request, Response, NextFunction} from 'express';
import config from '../config.js';

function countFileServerHits(req: Request, res: Response, next: NextFunction) {
    config.fileseverHits += 1;
    next();
}

export default countFileServerHits;