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
    name: 'Richard Feynman',

    email: 'aubrey@becker-halvorson.io',

    phone: '(509) 470-1788',

    adress: "That Barbala couldn't fly his way out of a wet paper bag",

    firstName: 'Contact the tower',

    lastName: "I'm washing my hands of it",

    stage: 'Customer',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Willard Libby',

    email: 'joslyn@spencer.org',

    phone: '1-839-692-7022 x3392',

    adress: 'So I was walking Oscar',

    firstName: 'That damn diabetes',

    lastName: 'So I was walking Oscar',

    stage: 'Lead',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Richard Feynman',

    email: 'issac@metz.net',

    phone: '321.213.7069 x3017',

    adress: 'That goddamn Datamate',

    firstName: "It's around here somewhere",

    lastName: "Y'all never listen to me",

    stage: 'Lead',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Albert Einstein',

    email: 'darrin.maggio@bashirian-mckenzie.biz',

    phone: '1-992-064-0798 x73833',

    adress: "How 'bout them Cowboys",

    firstName: 'I want my 5$ back',

    lastName: 'Contact the tower',

    stage: 'Lead',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Dmitri Mendeleev',

    email: 'page_frami@halvorson.net',

    phone: '861.759.6402 x906',

    adress: 'Like a red-headed stepchild',

    firstName: "Goin' hog huntin'",

    lastName: "Goin' hog huntin'",

    stage: 'Lead',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },
];

const AppointmentsData = [
  {
    date: new Date('2023-06-02'),

    scheduled: false,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Erwin Schrodinger',
  },

  {
    date: new Date('2023-12-29'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Werner Heisenberg',
  },

  {
    date: new Date('2023-12-21'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'J. Robert Oppenheimer',
  },

  {
    date: new Date('2023-05-13'),

    scheduled: false,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Euclid',
  },

  {
    date: new Date('2023-06-26'),

    scheduled: false,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    name: 'Michael Faraday',
  },
];

const JobsData = [
  {
    name: 'Anton van Leeuwenhoek',

    // type code here for "relation_many" field

    category: 'Commercial',

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
    name: 'Max Planck',

    // type code here for "relation_many" field

    category: 'Property Management',

    type: 'Repair',

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
    name: 'Pierre Simon de Laplace',

    // type code here for "relation_many" field

    category: 'Residential',

    type: 'New',

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
    name: 'Albrecht von Haller',

    // type code here for "relation_many" field

    category: 'Property Management',

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
    name: 'William Harvey',

    // type code here for "relation_many" field

    category: 'Commercial',

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
];

const EstimatesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Approved',

    name: 'Charles Sherrington',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Rejected',

    name: 'Edward O. Wilson',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Rejected',

    name: 'Frederick Gowland Hopkins',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Approved',

    name: 'Louis Pasteur',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Rejected',

    name: 'Hans Selye',
  },
];

const TradesData = [
  {
    name: 'Hans Bethe',
  },

  {
    name: 'James Watson',
  },

  {
    name: 'Linus Pauling',
  },

  {
    name: 'Noam Chomsky',
  },

  {
    name: 'Claude Bernard',
  },
];

const TemplatesData = [
  {
    // type code here for "relation_many" field

    materialCost: 99.57,

    laborCost: 90.76,

    markup: 97.01,

    profitMargin: 29.48,

    name: 'Murray Gell-Mann',

    totalPrice: 55.66,

    unitOfMeasurement: 'SQ',

    description: "C'mon Naomi",
  },

  {
    // type code here for "relation_many" field

    materialCost: 85.36,

    laborCost: 28.51,

    markup: 16.04,

    profitMargin: 71.85,

    name: 'Konrad Lorenz',

    totalPrice: 46.36,

    unitOfMeasurement: 'LF',

    description: "C'mon Naomi",
  },

  {
    // type code here for "relation_many" field

    materialCost: 28.59,

    laborCost: 35.78,

    markup: 39.06,

    profitMargin: 42.79,

    name: 'Anton van Leeuwenhoek',

    totalPrice: 89.94,

    unitOfMeasurement: 'LF',

    description: 'Turd gone wrong',
  },

  {
    // type code here for "relation_many" field

    materialCost: 80.78,

    laborCost: 77.94,

    markup: 20.54,

    profitMargin: 23.31,

    name: 'Richard Feynman',

    totalPrice: 73.67,

    unitOfMeasurement: 'LF',

    description: "I'm washing my hands of it",
  },

  {
    // type code here for "relation_many" field

    materialCost: 55.99,

    laborCost: 50.38,

    markup: 73.58,

    profitMargin: 60.88,

    name: 'Alfred Binet',

    totalPrice: 57.22,

    unitOfMeasurement: 'LF',

    description: "How 'bout them Cowboys",
  },
];

const DocumentsData = [
  {
    // type code here for "relation_many" field

    name: 'Albrecht von Haller',

    url: 'Reminds me of my old girlfriend Olga Goodntight',
  },

  {
    // type code here for "relation_many" field

    name: 'Konrad Lorenz',

    url: 'That damn Bill Stull',
  },

  {
    // type code here for "relation_many" field

    name: 'Thomas Hunt Morgan',

    url: 'No one tells me shit',
  },

  {
    // type code here for "relation_many" field

    name: 'Max Planck',

    url: "Goin' hog huntin'",
  },

  {
    // type code here for "relation_many" field

    name: 'Max von Laue',

    url: "How 'bout them Cowboys",
  },
];

const ImagesData = [
  {
    // type code here for "relation_many" field

    name: 'Sheldon Glashow',

    url: 'Let me tell ya',
  },

  {
    // type code here for "relation_many" field

    name: 'Claude Bernard',

    url: 'Yup',
  },

  {
    // type code here for "relation_many" field

    name: 'Heike Kamerlingh Onnes',

    url: 'That damn gimble',
  },

  {
    // type code here for "relation_many" field

    name: 'Nicolaus Copernicus',

    url: 'So I was walking Oscar',
  },

  {
    // type code here for "relation_many" field

    name: 'Gregor Mendel',

    url: 'That damn gimble',
  },
];

const TeamsData = [
  {
    name: 'Enrico Fermi',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Louis Victor de Broglie',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Alfred Binet',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Emil Kraepelin',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Paul Ehrlich',

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

    number: 6,
  },

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

    number: 2,
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 9,
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

  const relatedJob4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate4 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Estimate4?.setJob) {
    await Estimate4.setJob(relatedJob4);
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

  const relatedDocument4 = await Documents.findOne({
    offset: Math.floor(Math.random() * (await Documents.count())),
  });
  const Invoice4 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Invoice4?.setDocument) {
    await Invoice4.setDocument(relatedDocument4);
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
