import {ROUTES, AUTH_TOKEN_VAR_NAME, ERROR_MSG} from '../config/constants';
import {User} from '../models/user.model';
import {UserToken} from '../models/user-token.model';
import {serverError, api} from './common.handlers';
import uuid from 'uuid';

export default function initUserRoutes(app) {

    app.post(api(ROUTES.login), login);
    app.post(api(ROUTES.createUser), createUser);
    app.get(api(ROUTES.logout), logout);
    app.get(api(ROUTES.getUserByToken), getUserByToken);


    /**
     * Login router function
     */
    function login(req, res) {
        User
            .findOne({
                username: req.body.username,
                password: req.body.password
            })
            .then((user) => {
                if (!user) {

                    return Promise.reject(ERROR_MSG.NOT_AUTHORIZED);

                } else {

                    return UserToken.findOneAndUpdate(
                        {user: user.username},
                        {user: user.username, token: uuid.v4()},
                        {new: true, upsert: true}
                    );
                }
            })
            .then((userToken) => {
                res.send({authToken: userToken.token});
            })
            .catch((err) => serverError(err, res));
    }

    /**
     * Logout router function
     */
    function logout(req, res) {
        UserToken
            .findOneAndRemove({
                user: req.query.username,
                token: req.header(AUTH_TOKEN_VAR_NAME)
            })
            .then(() => {
                res.sendStatus(200);
            })
            .catch((err) => serverError(err, res));
    }

    function getUserByToken(req, res) {
        UserToken
            .findOne({token: req.header(AUTH_TOKEN_VAR_NAME)})
            .then((userToken) => {
                return userToken ? User.findOne({username: userToken.user}) : Promise.reject(ERROR_MSG.ACCESS_DENIED);
            })
            .then((user) => {
                // TODO: transform user data
                res.send({username: user.username});
            })
            .catch((err) => serverError(err, res));
    }

    function createUser(req, res) {
        new User({
            username: req.body.username,
            password: req.body.password
        })
            .save()
            .then(() => {
                res.status(200).send();
            })
            .catch((err) => {
                // E11000 code is duplicate key error index
                if (err.code === 11000) {
                    Object.assign(err, ERROR_MSG.MONGO_UNIQUE);
                }

                return serverError(err, res);
            });
    }
}