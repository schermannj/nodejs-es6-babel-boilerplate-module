import morgan from 'morgan';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {checkNodeEnv} from '../helpers/node-env.helper';

export default function initApplication(app) {
    checkNodeEnv();

    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, '../../dist')));
}