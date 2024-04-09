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
    name: 'Carl Gauss (Karl Friedrich Gauss)',

    email: 'estrella@fay-ruecker.co',

    phone: '366.834.9395',

    adress: 'Like a red-headed stepchild',

    firstName: "Goin' hog huntin'",

    lastName: 'Yup',

    stage: 'Lead',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    name: 'Comte de Buffon',

    email: 'grazyna@crist.biz',

    phone: '161-621-8011 x91220',

    adress: 'Got depression, Smith and Wessen',

    firstName: 'That damn gimble',

    lastName: "It's around here somewhere",

    stage: 'Customer',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    name: 'Gustav Kirchhoff',

    email: 'angelika_green@hessel.com',

    phone: '1-901-395-1193 x5141',

    adress: 'Come on now',

    firstName: 'Contact the tower',

    lastName: "It's around here somewhere",

    stage: 'Prospect',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    name: 'Jean Piaget',

    email: 'marybeth.monahan@sipes.biz',

    phone: '(430) 666-7249 x988',

    adress: 'I want my damn cart back',

    firstName: 'Reminds me of my old girlfriend Olga Goodntight',

    lastName: "Goin' hog huntin'",

    stage: 'Prospect',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },
];

const AppointmentsData = [
  {
    date: new Date('2023-04-23'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    name: 'Willard Libby',
  },

  {
    date: new Date('2023-08-16'),

    scheduled: true,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    name: 'Marie Curie',
  },

  {
    date: new Date('2024-01-23'),

    scheduled: false,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    name: 'Richard Feynman',
  },

  {
    date: new Date('2023-12-31'),

    scheduled: false,

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    name: 'Euclid',
  },
];

const JobsData = [
  {
    name: 'Emil Kraepelin',

    // type code here for "relation_many" field

    category: 'Residential',

    type: 'Retail',

    status: 'Invoiced',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Gustav Kirchhoff',

    // type code here for "relation_many" field

    category: 'Commercial',

    type: 'Warranty',

    status: 'Quoted',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Alfred Wegener',

    // type code here for "relation_many" field

    category: 'Commercial',

    type: 'Retail',

    status: 'Active',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Max Born',

    // type code here for "relation_many" field

    category: 'Residential',

    type: 'Service',

    status: 'Quoted',

    // type code here for "relation_one" field

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

    status: 'Sent',

    name: 'Archimedes',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Rejected',

    name: 'Karl Landsteiner',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Approved',

    name: 'Nicolaus Copernicus',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    status: 'Sent',

    name: 'Heike Kamerlingh Onnes',
  },
];

const TradesData = [
  {
    name: 'Jean Baptiste Lamarck',

    // type code here for "relation_one" field
  },

  {
    name: 'Albert Einstein',

    // type code here for "relation_one" field
  },

  {
    name: 'Paul Ehrlich',

    // type code here for "relation_one" field
  },

  {
    name: 'Stephen Hawking',

    // type code here for "relation_one" field
  },
];

const TemplatesData = [
  {
    // type code here for "relation_many" field

    materialCost: 85.59,

    laborCost: 70.35,

    markup: 18.31,

    profitMargin: 40.24,

    name: 'Max von Laue',

    totalPrice: 90.93,

    unitOfMeasurement: 'SQ',

    description: 'That damn Bill Stull',
  },

  {
    // type code here for "relation_many" field

    materialCost: 35.78,

    laborCost: 53.95,

    markup: 38.88,

    profitMargin: 19.44,

    name: 'John Dalton',

    totalPrice: 13.79,

    unitOfMeasurement: 'SQ',

    description: 'That damn gimble',
  },

  {
    // type code here for "relation_many" field

    materialCost: 91.51,

    laborCost: 63.76,

    markup: 84.45,

    profitMargin: 40.66,

    name: 'Thomas Hunt Morgan',

    totalPrice: 12.55,

    unitOfMeasurement: 'LF',

    description: "How 'bout them Cowboys",
  },

  {
    // type code here for "relation_many" field

    materialCost: 66.56,

    laborCost: 90.74,

    markup: 70.71,

    profitMargin: 75.15,

    name: 'George Gaylord Simpson',

    totalPrice: 14.51,

    unitOfMeasurement: 'SQ',

    description: 'My buddy Harlen',
  },
];

const DocumentsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    name: 'Dmitri Mendeleev',

    url: 'I want my damn cart back',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    name: 'John Dalton',

    url: 'Texas!',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    name: 'Charles Darwin',

    url: 'That damn diabetes',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    name: 'Stephen Hawking',

    url: 'That damn gimble',
  },
];

const ImagesData = [
  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    name: 'William Herschel',

    url: 'No one tells me shit',
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    name: 'Robert Koch',

    url: 'That damn gimble',
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    name: 'Carl Linnaeus',

    url: "Y'all never listen to me",
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    name: 'Albrecht von Haller',

    url: "Goin' hog huntin'",
  },
];

const TeamsData = [
  {
    name: 'Joseph J. Thomson',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Louis Victor de Broglie',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Francis Galton',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Euclid',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },
];

const InvoicesData = [
  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 8,
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 2,
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 5,
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    number: 2,
  },
];

// Similar logic for "relation_many"

async function associateUserWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setUser) {
    await User0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setUser) {
    await User1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setUser) {
    await User2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setUser) {
    await User3.setUser(relatedUser3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateContactWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact0 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contact0?.setUser) {
    await Contact0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact1 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contact1?.setUser) {
    await Contact1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact2 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contact2?.setUser) {
    await Contact2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact3 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Contact3?.setUser) {
    await Contact3.setUser(relatedUser3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateAppointmentWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setUser) {
    await Appointment0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setUser) {
    await Appointment1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setUser) {
    await Appointment2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setUser) {
    await Appointment3.setUser(relatedUser3);
  }
}

// Similar logic for "relation_many"

async function associateJobWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job0 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Job0?.setUser) {
    await Job0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job1 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Job1?.setUser) {
    await Job1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job2 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Job2?.setUser) {
    await Job2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job3 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Job3?.setUser) {
    await Job3.setUser(relatedUser3);
  }
}

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

async function associateTradeWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Trade0 = await Trades.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Trade0?.setUser) {
    await Trade0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Trade1 = await Trades.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Trade1?.setUser) {
    await Trade1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Trade2 = await Trades.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Trade2?.setUser) {
    await Trade2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Trade3 = await Trades.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Trade3?.setUser) {
    await Trade3.setUser(relatedUser3);
  }
}

// Similar logic for "relation_many"

async function associateDocumentWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document0 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Document0?.setUser) {
    await Document0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document1 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Document1?.setUser) {
    await Document1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document2 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Document2?.setUser) {
    await Document2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document3 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Document3?.setUser) {
    await Document3.setUser(relatedUser3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateImageWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image0 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Image0?.setUser) {
    await Image0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image1 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Image1?.setUser) {
    await Image1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image2 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Image2?.setUser) {
    await Image2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image3 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Image3?.setUser) {
    await Image3.setUser(relatedUser3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateInvoiceWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setUser) {
    await Invoice0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setUser) {
    await Invoice1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setUser) {
    await Invoice2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setUser) {
    await Invoice3.setUser(relatedUser3);
  }
}

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

      await associateUserWithUser(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateContactWithUser(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateAppointmentWithUser(),

      // Similar logic for "relation_many"

      await associateJobWithUser(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateEstimateWithJob(),

      // Similar logic for "relation_many"

      await associateTradeWithUser(),

      // Similar logic for "relation_many"

      await associateDocumentWithUser(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateImageWithUser(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateInvoiceWithUser(),

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
