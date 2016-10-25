export const APP_NAME = 'nodeApp';
export const API_PREFIX = '/api';

export const ROUTES = {
    login: '/login',
    logout: '/logout',
    getUserByToken: '/getUserByToken',
    createUser: '/user/create'
};

export const SAFE_REQUEST_URLS = [
    API_PREFIX + ROUTES.login,
    API_PREFIX + ROUTES.getUserByToken
];

export const AUTH_TOKEN_VAR_NAME = 'authToken';

export const MONGO_CONNECTION_URL = `mongodb://localhost/${APP_NAME}`;

export const ERROR_MSG = {
    NOT_AUTHORIZED: {
        errCode: 403,
        message: 'The user does not exist or password is wrong!'
    },
    ACCESS_DENIED: {
        errCode: 403,
        message: 'Unauthorized. You don\'t have access rights to see this page.'
    },
    MONGO_UNIQUE: {
        errCode: 400,
        message: 'There are another user with that username. Username must be unique!'
    }
};