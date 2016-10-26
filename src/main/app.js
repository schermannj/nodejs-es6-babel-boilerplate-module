import express from 'express';
import http from 'http';
import initApplication from './config/application.config';
import initRoutes from './config/routes.config';
import configureErrorHandler from './config/error-handler.config';
import initServer from './config/server.config';

/**
 * @description Create application with Express
 */
const app = express();

initApplication(app);


/**
 * @description Init application routes
 */
initRoutes(app);


/**
 * @description Configure Express error handler
 */
configureErrorHandler(app);


/**
 * @description Create HTTP server
 */
const server = http.createServer(app);

initServer(server);