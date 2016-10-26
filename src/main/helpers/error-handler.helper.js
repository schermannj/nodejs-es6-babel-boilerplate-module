import {ERROR_MSG} from '../config/constants';

export function accessDenied(res) {
    serverError(ERROR_MSG.ACCESS_DENIED, res);
}

export function serverError(err, res) {
    res.status(err.errCode ? err.errCode : 500).send({error: err.message ? err.message : 'Server side error. Please, try again later.'});
}