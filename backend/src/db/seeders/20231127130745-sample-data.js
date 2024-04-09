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
    name: 'Stephen Hawking',

    email: 'tyrone.walsh@kemmer-hermann.co',

    phone: '1-679-919-7463 x625',

    adress: 'Yup',

    firstName: 'Got depression, Smith and Wessen',

    lastName: 'Yup',

    stage: 'Lead',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Willard Libby',

    email: 'evan.turner@schoen-abernathy.biz',

    phone: '1-941-295-0462 x145',

    adress: "Y'all never listen to me",

    firstName: "I'm washing my hands of it",

    lastName: "Goin' hog huntin'",

    stage: 'Lead',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Emil Kraepelin',

    email: 'ruth@emmerich-feeney.co',

    phone: '1-492-091-0734 x2712',

    adress: "Y'all never listen to me",

    firstName: "That Barbala couldn't fly his way out of a wet paper bag",

    lastName: "It's around here somewhere",

    stage: 'Lead',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Emil Fischer',

    email: 'leonora@kris.net',

    phone: '(977) 836-4528 x8325',

    adress: 'Like a red-headed stepchild',

    firstName: 'Might be DQ time',

    lastName: 'Contact the tower',

    stage: 'Prospect',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },
];

const AppointmentsData = [
  {
    date: new Date('2023-10-24'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'William Harvey',
  },

  {
    date: new Date('2023-12-28'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Max Born',
  },

  {
    date: new Date('2023-10-19'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Murray Gell-Mann',
  },

  {
    date: new Date('2023-11-06'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Jean Piaget',
  },
];

const JobsData = [
  {
    name: 'Jean Baptiste Lamarck',

    // type code here for "relation_many" field

    category: 'Property Management',

    type: 'Retail',

    status: 'Approved',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Alfred Binet',

    // type code here for "relation_many" field

    category: 'Commercial',

    type: 'Retail',

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
    name: 'Louis Victor de Broglie',

    // type code here for "relation_many" field

    category: 'Residential',

    type: 'Inspection',

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
    name: 'Linus Pauling',

    // type code here for "relation_many" field

    category: 'Property Management',

    type: 'Warranty',

    status: 'Quoted',

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

    status: 'Draft',

    name: 'Claude Levi-Strauss',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Rejected',

    name: 'Nicolaus Copernicus',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Rejected',

    name: 'John Dalton',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Approved',

    name: 'George Gaylord Simpson',
  },
];

const TradesData = [
  {
    name: 'Louis Victor de Broglie',
  },

  {
    name: 'Carl Gauss (Karl Friedrich Gauss)',
  },

  {
    name: 'Sheldon Glashow',
  },

  {
    name: 'Louis Pasteur',
  },
];

const TemplatesData = [
  {
    // type code here for "relation_many" field

    materialCost: 41.27,

    laborCost: 72.97,

    markup: 87.48,

    profitMargin: 61.11,

    name: 'Rudolf Virchow',

    totalPrice: 35.89,

    unitOfMeasurement: 'LF',

    description: 'I want my 5$ back',
  },

  {
    // type code here for "relation_many" field

    materialCost: 67.44,

    laborCost: 44.15,

    markup: 45.19,

    profitMargin: 40.93,

    name: 'Frederick Gowland Hopkins',

    totalPrice: 31.62,

    unitOfMeasurement: 'LF',

    description: 'I want my 5$ back',
  },

  {
    // type code here for "relation_many" field

    materialCost: 64.03,

    laborCost: 14.07,

    markup: 39.25,

    profitMargin: 25.81,

    name: 'Max Planck',

    totalPrice: 89.37,

    unitOfMeasurement: 'LF',

    description: 'My buddy Harlen',
  },

  {
    // type code here for "relation_many" field

    materialCost: 99.52,

    laborCost: 91.12,

    markup: 79.49,

    profitMargin: 43.67,

    name: 'Murray Gell-Mann',

    totalPrice: 29.23,

    unitOfMeasurement: 'LF',

    description: 'Reminds me of my old girlfriend Olga Goodntight',
  },
];

const DocumentsData = [
  {
    // type code here for "relation_many" field

    name: 'Noam Chomsky',

    url: "Goin' hog huntin'",
  },

  {
    // type code here for "relation_many" field

    name: 'William Harvey',

    url: "How 'bout them Cowboys",
  },

  {
    // type code here for "relation_many" field

    name: 'Werner Heisenberg',

    url: 'I tell you what',
  },

  {
    // type code here for "relation_many" field

    name: 'Charles Darwin',

    url: "That's messed up",
  },
];

const ImagesData = [
  {
    // type code here for "relation_many" field

    name: 'Justus Liebig',

    url: "How 'bout them Cowboys",
  },

  {
    // type code here for "relation_many" field

    name: 'Konrad Lorenz',

    url: 'That damn diabetes',
  },

  {
    // type code here for "relation_many" field

    name: 'Charles Lyell',

    url: "That Barbala couldn't fly his way out of a wet paper bag",
  },

  {
    // type code here for "relation_many" field

    name: 'John Dalton',

    url: 'Standby',
  },
];

const TeamsData = [
  {
    name: 'Claude Bernard',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Frederick Sanger',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Louis Pasteur',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Hans Selye',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },
];

const InvoicesData = [
  {
    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 6,
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 4,
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 1,
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 7,
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
