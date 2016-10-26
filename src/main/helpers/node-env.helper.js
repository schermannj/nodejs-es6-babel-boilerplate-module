export function checkNodeEnv() {
    if (!process.env.NODE_ENV) {
        console.error('NODE_ENV have be set. Possible values: DEV, TEST, PROD.');
        process.exit(1);
    }
}