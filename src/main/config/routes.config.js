import tokenServiceMiddleware from '../routes/token-service.middleware';
import initUserRoutes from '../routes/user.routes';

export default function initRoutes(app) {
    tokenServiceMiddleware(app);
    initUserRoutes(app);
}