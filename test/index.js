process.env.NODE_ENV = 'TEST';

require('babel-register')({
    sourceMaps: true
});

module.exports = [
    require('./../src/test/user.rest.js')
];