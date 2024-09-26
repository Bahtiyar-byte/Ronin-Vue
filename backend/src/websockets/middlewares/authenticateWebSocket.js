const passport = require('passport');
const url = require('node:url');

module.exports = function authenticateWebSocket(req, socket, head, next) {
    const parsedUrl = url.parse(req.url, true);
    const token = parsedUrl.query.token;

    if (!token) {
        socket.destroy();
        return next(new Error('Authentication error: No token provided'));
    }

    req.headers.authorization = `Bearer ${token}`;

    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err !== null || !user) {
            socket.destroy();
            return next(new Error('Authentication error'));
        }

        req.user = user;
        next();
    })(req, {}, next);
}
