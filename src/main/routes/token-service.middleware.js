import {UserToken} from '../models/user-token.model';
import {API_PREFIX, AUTH_TOKEN_VAR_NAME} from '../config/constants';
import {accessDenied, serverError} from '../helpers/error-handler.helper';
import {isSafe} from '../helpers/api-builder.helper';

export default function tokenServiceMiddleware(app) {
    app.use(API_PREFIX, function tokenValidationMiddleware(req, res, next) {

        if (isSafe(req.originalUrl)) {

            next();

        } else if (getAuthToken(req)) {

            handleUserToken(req, res, next);

        } else {

            accessDenied(res);
        }
    });
}

function handleUserToken(req, res, next) {
    UserToken
        .findOne({token: getAuthToken(req)})
        .then((userToken) => {

            if (userToken) {

                next();

            } else {

                accessDenied(res);
            }
        })
        .catch((err) => serverError(err, res));
}

function getAuthToken(req) {
    return req.header(AUTH_TOKEN_VAR_NAME) ? req.header(AUTH_TOKEN_VAR_NAME) : req.query[AUTH_TOKEN_VAR_NAME];
}