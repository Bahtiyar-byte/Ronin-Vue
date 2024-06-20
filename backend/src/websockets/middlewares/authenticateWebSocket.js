const passport = require('passport');

module.exports = function authenticateWebSocket(req, socket, head, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err !== null || !user) {
            socket.destroy();
            return next(new Error('Authentication error'));
        }

        req.user = user;
        next();
    })(req, {}, next);
}
