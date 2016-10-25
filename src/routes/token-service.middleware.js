import {UserToken} from '../models/user-token.model';
import {API_PREFIX, SAFE_REQUEST_URLS, AUTH_TOKEN_VAR_NAME} from '../config/constants';
import {accessDenied, serverError} from './common.handlers';

export default function tokenServiceMiddleware(app) {
    app.use(API_PREFIX, function tokenValidationMiddleware(req, res, next) {

        if (SAFE_REQUEST_URLS.includes(req.originalUrl)) {
            next();
        } else if (req.header(AUTH_TOKEN_VAR_NAME) || req.query[AUTH_TOKEN_VAR_NAME]) {
            handleUserToken(req, res, next);
        } else {
            accessDenied(res);
        }
    });
}

function handleUserToken(req, res, next) {
    const token = req.header(AUTH_TOKEN_VAR_NAME) ? req.header(AUTH_TOKEN_VAR_NAME) : req.query[AUTH_TOKEN_VAR_NAME];

    UserToken
        .findOne({token: token})
        .then((userToken) => {
            if (userToken) {
                next();
            } else {
                accessDenied(res);
            }
        })
        .catch((err) => serverError(err, res));
}