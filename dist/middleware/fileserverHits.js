import config from '../config.js';
function countFileServerHits(req, res, next) {
    config.fileseverHits += 1;
    next();
}
export default countFileServerHits;
