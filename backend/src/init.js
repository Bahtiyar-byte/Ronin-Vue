
require('reflect-metadata')
require('./subscribers/index.ts')

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
        const estimateSenderRoutes = require('./routes/estimateSender');

        this.app.use(
            '/api/filters',
            this.passport.authenticate('jwt', { session: false }),
            filtersRoutes,
        );

        this.app.use(
            '/api/estimates-sender',
            this.passport.authenticate('jwt', { session: false }),
            estimateSenderRoutes,
        )
    }
}
