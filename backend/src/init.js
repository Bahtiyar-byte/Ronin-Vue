
require('./subscribers/index')

module.exports = class RoninAppInitialise {
    /**
     *
     * @param {Express} app
     * @param {Authenticator} passport
     */
    constructor(app, passport) {
        this.app = app;
        this.passport = passport;
    }

    initApp() {
        const filtersRoutes = require('./routes/filters');

        this.app.use(
            '/api/filters',
            this.passport.authenticate('jwt', { session: false }),
            filtersRoutes,
        );
    }
}
