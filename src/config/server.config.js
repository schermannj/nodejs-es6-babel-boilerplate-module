export default function initServer(server) {

    const httpPort = normalizePort(process.env.PORT || '3000');

    server.listen(httpPort);

    server.on('error', onError);
    server.on('listening', onListening);


    /**
     * Use it to normalize port
     */
    function  normalizePort(val) {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    function  onError(error) {
        console.error(error);
        process.exit(1);
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

        console.log(`Listening on ${bind}.`);
    }
};