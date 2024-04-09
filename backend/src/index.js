const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');

const usersRoutes = require('./routes/users');

const contactsRoutes = require('./routes/contacts');

const appointmentsRoutes = require('./routes/appointments');

const jobsRoutes = require('./routes/jobs');

const estimatesRoutes = require('./routes/estimates');

const tradesRoutes = require('./routes/trades');

const templatesRoutes = require('./routes/templates');

const documentsRoutes = require('./routes/documents');

const imagesRoutes = require('./routes/images');

const rolesRoutes = require('./routes/roles');

const teamsRoutes = require('./routes/teams');

const invoicesRoutes = require('./routes/invoices');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Ronin',
      description:
        'Ronin Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/contacts',
  passport.authenticate('jwt', { session: false }),
  contactsRoutes,
);

app.use(
  '/api/appointments',
  passport.authenticate('jwt', { session: false }),
  appointmentsRoutes,
);

app.use(
  '/api/jobs',
  passport.authenticate('jwt', { session: false }),
  jobsRoutes,
);

app.use(
  '/api/estimates',
  passport.authenticate('jwt', { session: false }),
  estimatesRoutes,
);

app.use(
  '/api/trades',
  passport.authenticate('jwt', { session: false }),
  tradesRoutes,
);

app.use(
  '/api/templates',
  passport.authenticate('jwt', { session: false }),
  templatesRoutes,
);

app.use(
  '/api/documents',
  passport.authenticate('jwt', { session: false }),
  documentsRoutes,
);

app.use(
  '/api/images',
  passport.authenticate('jwt', { session: false }),
  imagesRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/teams',
  passport.authenticate('jwt', { session: false }),
  teamsRoutes,
);

app.use(
  '/api/invoices',
  passport.authenticate('jwt', { session: false }),
  invoicesRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
