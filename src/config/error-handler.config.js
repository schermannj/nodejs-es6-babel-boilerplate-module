import {serverError} from '../routes/common.handlers';

export default function configureErrorHandler(app) {
    app.use(serverError);
}
