
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
        this.app.use(
            '/api/filters',
            this.passport.authenticate('jwt', { session: false }),
            require('./routes/filters'),
        );

        this.app.use(
            '/api/estimates-sender',
            this.passport.authenticate('jwt', { session: false }),
            require('./routes/estimateSender'),
        )

        this.app.use(
            '/api/contact-attachments',
            this.passport.authenticate('jwt', { session: false }),
            require('./routes/contactAttachments'),
        )
    }
}
