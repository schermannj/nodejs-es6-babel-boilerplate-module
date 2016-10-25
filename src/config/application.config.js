import morgan from 'morgan';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default function initApplication(app) {
    process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'DEV';

    setOwnIp();
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, '../../dist')));
}