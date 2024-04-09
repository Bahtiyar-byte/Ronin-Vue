const db = require('../models');
const Users = db.users;

const Contacts = db.contacts;

const Appointments = db.appointments;

const Jobs = db.jobs;

const Estimates = db.estimates;

const Trades = db.trades;

const Templates = db.templates;

const Documents = db.documents;

const Images = db.images;

const Teams = db.teams;

const Invoices = db.invoices;

const ContactsData = [
  {
    name: 'Andreas Vesalius',

    email: 'merilyn.hartmann@armstrong.net',

    phone: '(870) 977-7964',

    adress: 'Got depression, Smith and Wessen',

    firstName: 'Come on now',

    lastName: 'That goddamn Datamate',

    stage: 'Prospect',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Karl Landsteiner',

    email: 'bobby@wolff.info',

    phone: '(115) 727-6462',

    adress: 'Like a red-headed stepchild',

    firstName: "That's messed up",

    lastName: 'I got that scurvy',

    stage: 'Prospect',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Linus Pauling',

    email: 'kareem@aufderhar-grimes.net',

    phone: '530-441-0011',

    adress: 'That damn gimble',

    firstName: "Goin' hog huntin'",

    lastName: 'My boss gonna fire me',

    stage: 'Customer',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Robert Koch',

    email: 'kai_ondricka@blick-runolfsdottir.io',

    phone: '475.202.5963 x380',

    adress: 'I got that scurvy',

    firstName: 'Always the last one to the party',

    lastName: "That's messed up",

    stage: 'Prospect',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },
];

const AppointmentsData = [
  {
    date: new Date('2023-09-12'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Noam Chomsky',
  },

  {
    date: new Date('2024-03-05'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Robert Koch',
  },

  {
    date: new Date('2023-10-25'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Gustav Kirchhoff',
  },

  {
    date: new Date('2023-11-04'),

    scheduled: false,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Theodosius Dobzhansky',
  },
];

const JobsData = [
  {
    name: 'Alfred Kinsey',

    // type code here for "relation_many" field

    category: 'Property Management',

    type: 'New',

    status: 'Completed',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Claude Bernard',

    // type code here for "relation_many" field

    category: 'Property Management',

    type: 'Retail',

    status: 'Invoiced',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Carl Linnaeus',

    // type code here for "relation_many" field

    category: 'Commercial',

    type: 'Service',

    status: 'Quoted',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Isaac Newton',

    // type code here for "relation_many" field

    category: 'Residential',

    type: 'New',

    status: 'Active',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },
];

const EstimatesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Approved',

    name: 'Archimedes',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Sent',

    name: 'Sigmund Freud',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Approved',

    name: 'J. Robert Oppenheimer',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Draft',

    name: 'Frederick Sanger',
  },
];

const TradesData = [
  {
    name: 'Jean Piaget',
  },

  {
    name: 'Karl Landsteiner',
  },

  {
    name: 'Christiaan Huygens',
  },

  {
    name: 'Arthur Eddington',
  },
];

const TemplatesData = [
  {
    // type code here for "relation_many" field

    materialCost: 38.36,

    laborCost: 20.47,

    markup: 47.23,

    profitMargin: 52.64,

    name: 'Louis Victor de Broglie',

    totalPrice: 41.93,

    unitOfMeasurement: 'SQ',

    description: 'Let me tell ya',
  },

  {
    // type code here for "relation_many" field

    materialCost: 25.89,

    laborCost: 41.88,

    markup: 19.46,

    profitMargin: 39.89,

    name: 'Enrico Fermi',

    totalPrice: 92.67,

    unitOfMeasurement: 'LF',

    description: 'Turd gone wrong',
  },

  {
    // type code here for "relation_many" field

    materialCost: 52.01,

    laborCost: 56.31,

    markup: 78.41,

    profitMargin: 84.73,

    name: 'Claude Bernard',

    totalPrice: 84.49,

    unitOfMeasurement: 'SQ',

    description: "I'm washing my hands of it",
  },

  {
    // type code here for "relation_many" field

    materialCost: 63.02,

    laborCost: 91.17,

    markup: 49.75,

    profitMargin: 25.16,

    name: 'Konrad Lorenz',

    totalPrice: 55.07,

    unitOfMeasurement: 'SQ',

    description: 'Got depression, Smith and Wessen',
  },
];

const DocumentsData = [
  {
    // type code here for "relation_many" field

    name: 'Gertrude Belle Elion',

    url: 'No one tells me shit',
  },

  {
    // type code here for "relation_many" field

    name: 'Sigmund Freud',

    url: "I'm washing my hands of it",
  },

  {
    // type code here for "relation_many" field

    name: 'Max Born',

    url: 'Contact the tower',
  },

  {
    // type code here for "relation_many" field

    name: 'Justus Liebig',

    url: 'Got depression, Smith and Wessen',
  },
];

const ImagesData = [
  {
    // type code here for "relation_many" field

    name: 'John von Neumann',

    url: "How 'bout them Cowboys",
  },

  {
    // type code here for "relation_many" field

    name: 'Ludwig Boltzmann',

    url: 'No one tells me shit',
  },

  {
    // type code here for "relation_many" field

    name: 'Max Delbruck',

    url: "Y'all never listen to me",
  },

  {
    // type code here for "relation_many" field

    name: 'Ludwig Boltzmann',

    url: 'Contact the tower',
  },
];

const TeamsData = [
  {
    name: 'Frederick Gowland Hopkins',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Justus Liebig',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Christiaan Huygens',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Sheldon Glashow',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },
];

const InvoicesData = [
  {
    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 8,
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 7,
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 5,
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 4,
  },
];

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateEstimateWithJob() {
  const relatedJob0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setJob) {
    await Estimate0.setJob(relatedJob0);
  }

  const relatedJob1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setJob) {
    await Estimate1.setJob(relatedJob1);
  }

  const relatedJob2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setJob) {
    await Estimate2.setJob(relatedJob2);
  }

  const relatedJob3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate3 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Estimate3?.setJob) {
    await Estimate3.setJob(relatedJob3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateInvoiceWithDocument() {
  const relatedDocument0 = await Documents.findOne({
    offset: Math.floor(Math.random() * (await Documents.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setDocument) {
    await Invoice0.setDocument(relatedDocument0);
  }

  const relatedDocument1 = await Documents.findOne({
    offset: Math.floor(Math.random() * (await Documents.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setDocument) {
    await Invoice1.setDocument(relatedDocument1);
  }

  const relatedDocument2 = await Documents.findOne({
    offset: Math.floor(Math.random() * (await Documents.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setDocument) {
    await Invoice2.setDocument(relatedDocument2);
  }

  const relatedDocument3 = await Documents.findOne({
    offset: Math.floor(Math.random() * (await Documents.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setDocument) {
    await Invoice3.setDocument(relatedDocument3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Contacts.bulkCreate(ContactsData);

    await Appointments.bulkCreate(AppointmentsData);

    await Jobs.bulkCreate(JobsData);

    await Estimates.bulkCreate(EstimatesData);

    await Trades.bulkCreate(TradesData);

    await Templates.bulkCreate(TemplatesData);

    await Documents.bulkCreate(DocumentsData);

    await Images.bulkCreate(ImagesData);

    await Teams.bulkCreate(TeamsData);

    await Invoices.bulkCreate(InvoicesData);

    await Promise.all([
      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateEstimateWithJob(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateInvoiceWithDocument(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contacts', null, {});

    await queryInterface.bulkDelete('appointments', null, {});

    await queryInterface.bulkDelete('jobs', null, {});

    await queryInterface.bulkDelete('estimates', null, {});

    await queryInterface.bulkDelete('trades', null, {});

    await queryInterface.bulkDelete('templates', null, {});

    await queryInterface.bulkDelete('documents', null, {});

    await queryInterface.bulkDelete('images', null, {});

    await queryInterface.bulkDelete('teams', null, {});

    await queryInterface.bulkDelete('invoices', null, {});
  },
};
