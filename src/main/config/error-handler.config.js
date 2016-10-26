import {serverError} from '../helpers/error-handler.helper';

export default function configureErrorHandler(app) {
    app.use(serverError);
}
