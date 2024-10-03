require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '10mb' }));

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

const openaiRoutes = require('./routes/openai');

const usersRoutes = require('./routes/users');

const contactsRoutes = require('./routes/contacts');

const estimatesRoutes = require('./routes/estimates');

const jobsRoutes = require('./routes/jobs');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const templatesRoutes = require('./routes/templates');

const tradesRoutes = require('./routes/trades');

const invoicesRoutes = require('./routes/invoices');

const ordersRoutes = require('./routes/orders');

const imagesRoutes = require('./routes/images');

const documentsRoutes = require('./routes/documents');

const emailsRoutes = require('./routes/emails');

const chatsRoutes = require('./routes/chats');

const appointmentsRoutes = require('./routes/appointments');

const tasksRoutes = require('./routes/tasks');

const contractsRoutes = require('./routes/contracts');

const amendmentsRoutes = require('./routes/amendments');

const estimate_sectionsRoutes = require('./routes/estimate_sections');

const contact_phonesRoutes = require('./routes/contact_phones');

const contact_emailsRoutes = require('./routes/contact_emails');

const labor_ticketRoutes = require('./routes/labor_ticket');

const crewRoutes = require('./routes/crew');

const subcontractorRoutes = require('./routes/subcontractor');

const historyRoutes = require('./routes/history');

const addressRoutes = require('./routes/address');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Evans CRM',
      description:
          'Evans CRM Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
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
    '/api/estimates',
    passport.authenticate('jwt', { session: false }),
    estimatesRoutes,
);

app.use(
    '/api/jobs',
    passport.authenticate('jwt', { session: false }),
    jobsRoutes,
);

app.use(
    '/api/roles',
    passport.authenticate('jwt', { session: false }),
    rolesRoutes,
);

app.use(
    '/api/permissions',
    passport.authenticate('jwt', { session: false }),
    permissionsRoutes,
);

app.use(
    '/api/templates',
    passport.authenticate('jwt', { session: false }),
    templatesRoutes,
);

app.use(
    '/api/trades',
    passport.authenticate('jwt', { session: false }),
    tradesRoutes,
);

app.use(
    '/api/invoices',
    passport.authenticate('jwt', { session: false }),
    invoicesRoutes,
);

app.use(
    '/api/orders',
    passport.authenticate('jwt', { session: false }),
    ordersRoutes,
);

app.use(
    '/api/images',
    passport.authenticate('jwt', { session: false }),
    imagesRoutes,
);

app.use(
    '/api/documents',
    passport.authenticate('jwt', { session: false }),
    documentsRoutes,
);

app.use(
    '/api/emails',
    passport.authenticate('jwt', { session: false }),
    emailsRoutes,
);

app.use(
    '/api/chats',
    passport.authenticate('jwt', { session: false }),
    chatsRoutes,
);

app.use(
    '/api/appointments',
    passport.authenticate('jwt', { session: false }),
    appointmentsRoutes,
);

app.use(
    '/api/tasks',
    passport.authenticate('jwt', { session: false }),
    tasksRoutes,
);

app.use(
    '/api/contracts',
    passport.authenticate('jwt', { session: false }),
    contractsRoutes,
);

app.use(
    '/api/amendments',
    passport.authenticate('jwt', { session: false }),
    amendmentsRoutes,
);

app.use(
    '/api/estimate_sections',
    passport.authenticate('jwt', { session: false }),
    estimate_sectionsRoutes,
);

app.use(
    '/api/contact_phones',
    passport.authenticate('jwt', { session: false }),
    contact_phonesRoutes,
);

app.use(
    '/api/contact_emails',
    passport.authenticate('jwt', { session: false }),
    contact_emailsRoutes,
);

app.use(
    '/api/labor_ticket',
    passport.authenticate('jwt', { session: false }),
    labor_ticketRoutes,
);

app.use(
    '/api/crew',
    passport.authenticate('jwt', { session: false }),
    crewRoutes,
);

app.use(
    '/api/subcontractor',
    passport.authenticate('jwt', { session: false }),
    subcontractorRoutes,
);

app.use(
    '/api/history',
    passport.authenticate('jwt', { session: false }),
    historyRoutes,
);

app.use(
    '/api/address',
    passport.authenticate('jwt', { session: false }),
    addressRoutes,
);

app.use(
    '/api/openai',
    passport.authenticate('jwt', { session: false }),
    openaiRoutes,
);

app.use(
    '/api/search',
    passport.authenticate('jwt', { session: false }),
    searchRoutes,
);

const RoninAppInitialise = require('./init');
const roninApp = new RoninAppInitialise(app, passport);

roninApp.initApp();

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8090;

db.sequelize.sync().then(function () {
  const server = app.listen(PORT, () => {
    updateTemplateWithTrade()
    console.log(`Listening on port ${PORT}`);
  });

  const WebSocketManager = require('./websockets/WebSocketManager');

  // Initialize the WebSocket server
  WebSocketManager.initialize(server);
});
const TemplatesData = [
  {
    name: 'Aluminum/ Flashing',

    description: 'Aluminum/ Flashing',

    trade : 'Aluminum/ Flashing',

    related_trade: []

    // type code here for "relation_one" field
  },

  {
    name: 'Box Gutter Service- Mule Hide',

    description: 'Install new Mule-Hide silicone patch to necessary seams, cracks, holes and eave tubes in gutter system.\n' +
        'Install new Mule-Hide silicone rubber system to entire box gutter system.',

    trade: 'Box Gutters',

    related_trade: []
  },

  {
    name: 'Box Gutter Service: Gaco',

    description: 'Install new Gaco silicone patch to necessary seams, cracks, holes and eave tubes in gutter system.\n' +
        'Install new Gaco silicone rubber system to entire box gutter system.',

    trade: 'Box Gutters',

    related_trade: []
    // type code here for "relation_one" field
  },

  {
    name: 'Inspection Report',

    description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow',

    trade: 'Box Gutters',

    related_trade: []

    // type code here for "relation_one" field
  },

  {
    name: 'Charles Darwin',

    description: 'Younglings, younglings gather ’round.',

    trade: 'Box Gutters',

    related_trade: []

    // type code here for "relation_one" field
  },

  {
    name: 'Downspouts',

    description: 'Downspouts',

    trade: 'Downspouts',

    related_trade: []
  },

  {
    name: 'EPDM Roof',

    description: 'Remove existing roof down to roof deck.\n' +
        'Install new half-inch fiber insulation board to entire roof.\n' +
        'Install new EPDM 0.60 mil glue-down system rubber roof.',

    trade: 'EPDM',

    related_trade: []
  },

  {
    name: 'Inspection Report',

    description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',

    trade: 'EPDM',

    related_trade: []

  },

  {
    name: 'Flat Roofing',

    description: 'Flat Roofing',

    trade: 'Flat Roof',

    related_trade: []

  },

  {
    name: 'Shur Flo Gutter Guards 5"',

    description: 'Install new aluminum Shur Flo gutter guard system. Zip screw gutter guards to the existing gutters. Warranty: Labor comes with 15-year labor warranty.',

    trade: 'Gutter Guards',

    related_trade: []

  },

  {
    name: 'Shur Flo Gutter Guards 6"',

    description: 'Install new aluminum Shur Flo gutter guard system. Zip screw gutter guards to the existing gutters. Warranty: Labor comes with 15-year labor warranty.',

    trade: 'Gutter Guards',

    related_trade: []

  },

  {
    name: '5" Gutters',

    description: '\n' +
        '- We will remove and dispose of the existing gutters and downspouts.\n' +
        '- New 5" aluminum seamless gutters will be installed.  Color selection to be picked out by homeowner.\n' +
        '- Install new 2x3 downspouts.',

    trade: 'Gutters',

    related_trade: []

  },

  {
    name: '6" Gutters',

    description: '- We will remove and dispose of the existing gutters and downspouts.\n' +
        '- New 6" aluminum seamless gutters will be installed.  Color selection to be picked out by homeowner.\n' +
        '- Install new downspouts.',

    trade: 'Gutters',

    related_trade: []

  },

  {
    name: 'Box Gutter Service- Mule Hide',

    description: 'Install new Mule-Hide silicone patch to necessary seams, cracks, holes and eave tubes in gutter system.\n' +
        'Install new Mule-Hide silicone rubber system to entire box gutter system.',

    trade: 'Gutters',

    related_trade: []

  },

  {
    name: 'Box Gutter Service: Gaco',

    description: 'Install new Gaco silicone patch to necessary seams, cracks, holes and eave tubes in gutter system.\n' +
        'Install new Gaco silicone rubber system to entire box gutter system',

    trade: 'Gutters',

    related_trade: []

  },

  {
    name: 'Downspouts',

    description: 'Downspouts',

    trade: 'Gutters',

    related_trade: []

  },

  {
    name: 'Inspection Report',

    description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',

    trade: 'Gutters',

    related_trade: []

  },

  {
    name: 'Shur Flo Gutter Guards 5"',

    description: 'Install new aluminum Shur Flo gutter guard system. Zip screw gutter guards to the existing gutters.\n' +
        '\n' +
        'Warranty: Labor comes with 15-year labor warranty',

    trade: 'Gutters',

    related_trade: []

  },

  {
    name: 'Shur Flo Gutter Guards 6"',

    description: 'Install new aluminum Shur Flo gutter guard system. Zip screw gutter guards to the existing gutters.\n' +
        '\n' +
        'Warranty: Labor comes with 15-year labor warranty',

    trade: 'Gutters',

    related_trade: []

  },

  {
    name: 'Inspection Report',

    description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',

    trade: 'Metal',

    related_trade: []

  },

  {
    name: 'Metal Roofing',

    description: 'Remove existing layer of roof down to roof deck.\n' +
        'Removal of any additional layers will be an additional cost of $75 per square. Tighten down any loose decking using eight-penny nails. Any bad lumber will be replaced at an additional $5.50/linear foot or $75 per 7/16 sheet OSB',

    trade: 'Metal',

    related_trade: []

  },

  {
    name: 'Ventilation',

    description: 'Install Lomanco Deck-Air ventilation at the eaves. (     )\n' +
        'The Deck-Air®, when properly installed with proper exhaust vents, provides a balanced ventilation system to rid your attic space of trapped heat and moisture',
    trade: 'Metal',

    related_trade: []

  },

  {
    name: 'Brad GAF Template',

    description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square.\n' +
        'Tighten down any loose decking using eight-penny nails.  Any bad lumber will be replaced at an additional $5.50/linear foot OR $75 per 7/16 sheet OSB',
    trade: 'Roofing',

    related_trade: []

  },

  {
    name: 'EPDM Roof',

    description: 'Remove existing roof down to roof deck.\n' +
        'Install new half-inch fiber insulation board to entire roof.\n' +
        'Install new EPDM 0.60 mil glue-down system rubber roof',
    trade: 'Roofing',

    related_trade: []

  },

  {
    name: 'Gaco',

    description: 'Install new Gaco silicone patch to necessary seams, drains, pipes, and extrusions on entire roof. \n' +
        'Install new Gaco silicone roof system to entire roof.\n' +
        'Clean up and haul away all debris',
    trade: 'Roofing',

    related_trade: []

  },

  {
    name: 'GAF Timberline HDZ- ABC',

    description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square.\n' +
        'Tighten down any loose decking using eight-penny nails.  Any bad lumber will be replaced at an additional $5.50/linear foot OR $75 per 7/16 sheet OSB',
    trade: 'Roofing',

    related_trade: []

  },

  {
    name: 'Mule Hide',

    description: 'Install new Mule-Hide silicone patch to necessary seams, drains, pipes, and extrusions on entire roof.\n' +
        'Install new Mule-Hide silicone roof system to entire roof.\n' +
        'Clean up and haul away all debris',
    trade: 'Roofing',

    related_trade: []

  },

  {
    name: 'Slate Service Call',

    description: 'Service slate roof by replacing any missing or damaged slate.\n' +
        'Slate will be replaced at an additional $50/piece.',
    trade: 'Roofing',

    related_trade: []

  },

  {
    name: 'Service Repairs',

    description: 'Service Repairs',
    trade: 'Service Repairs',

    related_trade: []

  },

  {
    name: 'Service Repairs: Tile Roof',

    description: 'Service tile roof by replacing any missing or damaged slate.\n' +
        'Tile will be replaced at an additional $50/piece',
    trade: 'Service Repairs',

    related_trade: []

  },

  {
    name: 'Slate Service Call',

    description: 'Service slate roof by replacing any missing or damaged slate.\n' +
        'Slate will be replaced at an additional $50/piece.',
    trade: 'Service Repairs',

    related_trade: []

  },

  {
    name: 'Brad GAF Template',

    description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square.\n' +
        'Tighten down any loose decking using eight-penny nails.  Any bad lumber will be replaced at an additional $5.50/linear foot OR $75 per 7/16 sheet OSB',
    trade: 'Singles',

    related_trade: []

  },

  {
    name: 'GAF Roof or Owens Corning',

    description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square.\n' +
        'Tighten down any loose decking using eight-penny nails. Any bad lumber will be replaced at an additional $5.50/linear foot or $75 per 7/16 sheet OSB',
    trade: 'Singles',

    related_trade: []

  },

  {
    name: 'GAF Timberline HDZ- ABC',

    description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square.\n' +
        'Tighten down any loose decking using eight-penny nails.  Any bad lumber will be replaced at an additional $5.50/linear foot OR $75 per 7/16 sheet OSB',
    trade: 'Singles',

    related_trade: []

  },

  {
    name: 'Inspection Report',

    description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',
    trade: 'Singles',

    related_trade: []

  },

  {
    name: 'Owens Corning',

    description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square. \n' +
        'Tighten down any loose decking using eight-penny nails. Any bad lumber will be replaced at an additional $5.50/linear foot or $75 per 7/16 sheet OSB',
    trade: 'Singles',

    related_trade: []

  },

  {
    name: 'Ventilation',

    description: 'Install Lomanco Deck-Air ventilation at the eaves. (     )\n' +
        'The Deck-Air®, when properly installed with proper exhaust vents, provides a balanced ventilation system to rid your attic space of trapped heat and moisture.',
    trade: 'Singles',

    related_trade: []

  },

  {
    name: 'Siding Template',

    description: 'Siding',
    trade: 'Siding',

    related_trade: []

  },

  {
    name: 'Gaco',

    description: 'Install new Gaco silicone patch to necessary seams, drains, pipes, and extrusions on entire roof. \n' +
        'Install new Gaco silicone roof system to entire roof.\n' +
        'Clean up and haul away all debris.',
    trade: 'Silicone',
    related_trade: []

  },


  {
    name: 'Henry Silicone',

    description: 'Install new Henry silicone patch to necessary seams, drains, pipes, and extrusions on entire roof. \n' +
        'Install new Henry silicone roof system to entire roof.\n' +
        'Clean up and haul away all debris.',
    trade: 'Silicone',
    related_trade: []

  },

  {
    name: 'Inspection Report',

    description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow',
    trade: 'Silicone',
    related_trade: []

  },

  {
    name: 'Mule Hide',

    description: 'Install new Mule-Hide silicone patch to necessary seams, drains, pipes, and extrusions on entire roof.\n' +
        'Install new Mule-Hide silicone roof system to entire roof.\n' +
        'Clean up and haul away all debris',
    trade: 'Silicone',
    related_trade: []

  },

  {
    name: 'Inspection Report',

    description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',
    trade: 'Slate',
    related_trade: []

  },

  {
    name: 'Slate Service Call',

    description: 'Service slate roof by replacing any missing or damaged slate.\n' +
        'Slate will be replaced at an additional $50/piece',
    trade: 'Slate',
    related_trade: []

  },

  {
    name: 'Inspection Report',

    description: '\n' +
        'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow:',
    trade: 'Tile',
    related_trade: []

  },

  {
    name: 'Service Repairs: Tile Roof',

    description: 'Service tile roof by replacing any missing or damaged slate.\n' +
        'Tile will be replaced at an additional $50/piece.',
    trade: 'Tile',
    related_trade: []

  },

  {
    name: 'TPO',

    description: '\n' +
        'GAF TPO RE-COVER\n' +
        '• REMOVE ALL WALL FLASHINGS, TERMINATION BAR, PIPE FLASHINGS TO PREP FOR NEW ROOFING SYSTEM.\n' +
        '• REMOVE LAST APPIED ROOFING SYSTEM LEAVING THE ORIGINAL IN TACT',
    trade: 'Tile',
    related_trade: []

  },

  {
    name: 'Ventilation',

    description: 'Install Lomanco Deck-Air ventilation at the eaves. (     )\n' +
        'The Deck-Air®, when properly installed with proper exhaust vents, provides a balanced ventilation system to rid your attic space of trapped heat and moisture.',
    trade: 'Ventilation',

    related_trade: []

  },
];
async function updateTemplateWithTrade(){
  for(const template of TemplatesData){
    const tradeId = await getTradeId(template.trade);
    const templateId = await getTemplateId(template.name);
    if (tradeId && templateId) {
      insertIntoPivotTable(templateId, tradeId)
    }
  }
}

async function getTemplateId(templateName){
  try {
    const template = await db.templates.findOne({
      where: {name : templateName},
    });
    return template? template.id : null;
  } catch (error) {}
}

async function getTradeId(tradeName){
  try {
    const trade = await db.trades.findOne({
      where: {name : tradeName},
    });
    return trade? trade.id : null;
  } catch (error) {}
}

async function insertIntoPivotTable(templateId, tradeId) {
  try {
    const query = `
   INSERT INTO "public"."templatesRelated_tradeTrades" ("templates_related_tradeId", "tradeId", "createdAt", "updatedAt")
   VALUES (:templates_related_tradeId, :tradeId, NOW(), NOW())
   ON CONFLICT ("templates_related_tradeId", "tradeId") DO NOTHING
 `;

    await db.sequelize.query(query, {
      replacements: {
        templates_related_tradeId: templateId,
        tradeId: tradeId,
      },
    });

    console.log('Record inserted into pivot table (if it didn\'t already exist)');
  } catch (error) {
    console.error('Error inserting record into pivot table:', error);
  }
}




module.exports = app;
