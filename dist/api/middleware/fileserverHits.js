import { config } from '../../config.js';
function countFileServerHits(req, res, next) {
    config.api.fileServerHits += 1;
    next();
}
export default countFileServerHits;
