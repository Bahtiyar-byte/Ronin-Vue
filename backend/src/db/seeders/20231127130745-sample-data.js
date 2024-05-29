const db = require('../models');
const Users = db.users;

const Contacts = db.contacts;

const Addresses = db.addresses;

const Jobs = db.jobs;

const Estimates = db.estimates;

const Templates = db.templates;

const Trades = db.trades;

const Invoices = db.invoices;

const Orders = db.orders;

const Images = db.images;

const Documents = db.documents;

const Emails = db.emails;

const Chats = db.chats;

const Appointments = db.appointments;

const Tasks = db.tasks;

const Contracts = db.contracts;

const Amendments = db.amendments;

const ContactsData = [
  {
    firstName: 'I got that scurvy',

    lastName: 'No one tells me shit',

    email: 'lamont@kohler-leuschke.org',

    phone: '1-941-288-1776 x888',

    company: 'Wolf-Jakubowski',

    status: 'Prospect',

    source: 'Facebook',

    crossReference: 'Turd gone wrong',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    firstName: 'Reminds me of my old girlfriend Olga Goodntight',

    lastName: "That Barbala couldn't fly his way out of a wet paper bag",

    email: 'temple_schinner@mclaughlin-huels.io',

    phone: '(852) 410-8342 x3289',

    company: 'Jacobi, Rath and Marquardt',

    status: 'Customer',

    source: 'Facebook',

    crossReference: 'Contact the tower',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    firstName: "I'm washing my hands of it",

    lastName: 'I want my damn cart back',

    email: 'rodrick@nienow.net',

    phone: '(934) 020-9277 x09169',

    company: 'Jaskolski, Crist and McGlynn',

    status: 'Customer',

    source: 'Other',

    crossReference: "Goin' hog huntin'",

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const AddressesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'Got depression, Smith and Wessen',

    suite_apt_unit: "Goin' hog huntin'",

    city: 'So I was walking Oscar',

    state: 'AZ',

    zip: 'I want my 5$ back',

    country: "It's around here somewhere",

    type: 'Location',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'I want my 5$ back',

    suite_apt_unit: 'Come on now',

    city: 'Texas!',

    state: 'CA',

    zip: 'I tell you what',

    country: 'Reminds me of my old girlfriend Olga Goodntight',

    type: 'Billing',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: "That's messed up",

    suite_apt_unit: 'That damn diabetes',

    city: "That's messed up",

    state: 'CA',

    zip: "That's messed up",

    country: 'Turd gone wrong',

    type: 'Location',

    // type code here for "relation_one" field
  },
];

const JobsData = [
  {
    Name: "That Barbala couldn't fly his way out of a wet paper bag",

    type: 'Insurance',

    category: 'Residential',

    status: 'Invoiced',

    startDate: new Date('2024-03-17'),

    endDate: new Date('2023-06-18'),

    description: 'Ow, ow, OW! On my ear you are!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: 'I tell you what',

    type: 'Warranty',

    category: 'Residential',

    status: 'Invoiced',

    startDate: new Date('2024-03-13'),

    endDate: new Date('2024-05-09'),

    description: 'Mudhole? Slimy? My home this is!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: 'I want my 5$ back',

    type: 'Service',

    category: 'Residential',

    status: 'Invoiced',

    startDate: new Date('2024-01-13'),

    endDate: new Date('2024-02-18'),

    description:
      'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained. A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away - to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const EstimatesData = [
  {
    description: 'To answer power with power, the Jedi way this is',

    additionalNotes:
      'Once you start down the dark path, forever will it dominate your destiny, consume you it will.',

    price: 91.52,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Reckless he is. Matters are worse.',

    additionalNotes: 'Truly wonderful, the mind of a child is.',

    price: 23.47,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description:
      'Do not assume anything Obi-Wan. Clear your mind must be if you are to discover the real villains behind this plot.',

    additionalNotes: 'At an end your rule is, and not short enough it was!',

    price: 11.71,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TemplatesData = [
  {
    name: 'Joseph J. Thomson',

    description:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Thomas Hunt Morgan',

    description: 'Do. Or do not. There is no try.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Sheldon Glashow',

    description: 'Your weapons, you will not need them.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TradesData = [
  {
    Name: 'TPO',
  },

  {
    Name: 'Soffit/Fascia',
  },

  {
    Name: 'Service Repairs',
  },
];

const InvoicesData = [
  {
    invoiceNumber: 'Turd gone wrong',

    invoiceDate: new Date('2023-10-10'),

    terms: 'Net 45 Days',

    approvedJobValue: 44.87,

    invoicedAmount: 73.87,

    balanceAmount: 36.19,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: "Y'all never listen to me",

    invoiceDate: new Date('2024-01-02'),

    terms: 'Net 7 Days',

    approvedJobValue: 60.31,

    invoicedAmount: 29.01,

    balanceAmount: 49.51,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'Yup',

    invoiceDate: new Date('2024-01-25'),

    terms: 'By Due Date',

    approvedJobValue: 29.19,

    invoicedAmount: 19.29,

    balanceAmount: 23.28,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: "That's messed up",

    totalAmount: 30.09,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: "Y'all never listen to me",

    totalAmount: 63.78,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'Contact the tower',

    totalAmount: 42.54,

    // type code here for "relation_one" field
  },
];

const ImagesData = [
  {
    name: 'Jean Piaget',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Antoine Laurent Lavoisier',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Alexander Fleming',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const DocumentsData = [
  {
    // type code here for "relation_one" field

    name: 'Gertrude Belle Elion',

    active: true,

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    name: 'Andreas Vesalius',

    active: false,

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    name: 'Edwin Hubble',

    active: true,

    // type code here for "files" field

    // type code here for "relation_one" field
  },
];

const EmailsData = [
  {
    // type code here for "relation_one" field

    toAddress: 'Might be DQ time',

    fromAddress: "I'm washing my hands of it",

    isInbound: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    body: 'At an end your rule is, and not short enough it was!',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    toAddress: "That Barbala couldn't fly his way out of a wet paper bag",

    fromAddress: "C'mon Naomi",

    isInbound: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    body: 'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    toAddress: 'Come on now',

    fromAddress: 'Contact the tower',

    isInbound: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Hmm. In the end, cowards are those who follow the dark side.',

    body: 'Reckless he is. Matters are worse.',

    // type code here for "relation_one" field
  },
];

const ChatsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    sentTime: new Date('2023-08-31'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message:
      'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    sentTime: new Date('2024-05-13'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message:
      'The dark side clouds everything. Impossible to see the future is.',

    sentTime: new Date('2023-08-17'),
  },
];

const AppointmentsData = [
  {
    subject: 'Like a red-headed stepchild',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-08-28'),

    endTime: new Date('2023-07-03'),

    description: 'Already know you that which you need.',

    location: 'Contact the tower',

    // type code here for "relation_one" field

    reminder: new Date('2023-06-29'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    subject: 'Texas!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-11-25'),

    endTime: new Date('2023-10-14'),

    description: 'Younglings, younglings gather ’round.',

    location: 'I want my 5$ back',

    // type code here for "relation_one" field

    reminder: new Date('2023-09-23'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    subject: 'That damn gimble',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-12-01'),

    endTime: new Date('2023-06-30'),

    description:
      'Do not assume anything Obi-Wan. Clear your mind must be if you are to discover the real villains behind this plot.',

    location: 'Yup',

    // type code here for "relation_one" field

    reminder: new Date('2023-08-17'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TasksData = [
  {
    subject: "C'mon Naomi",

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2023-07-12'),

    // type code here for "relation_one" field

    description: 'Younglings, younglings gather ’round.',

    priority: 'High',

    completed: true,

    // type code here for "relation_one" field
  },

  {
    subject: 'That damn gimble',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2024-05-06'),

    // type code here for "relation_one" field

    description: 'Truly wonderful, the mind of a child is.',

    priority: 'Low',

    completed: false,

    // type code here for "relation_one" field
  },

  {
    subject: 'Always the last one to the party',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2023-12-02'),

    // type code here for "relation_one" field

    description:
      'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    priority: 'Low',

    completed: true,

    // type code here for "relation_one" field
  },
];

const ContractsData = [
  {
    name: 'Isaac Newton',

    amount: 30.68,

    body: 'Luminous beings are we - not this crude matter.',

    // type code here for "relation_one" field

    signedDate: new Date('2023-10-28'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'August Kekule',

    amount: 95.49,

    body: 'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    // type code here for "relation_one" field

    signedDate: new Date('2024-03-03'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Max Planck',

    amount: 88.65,

    body: 'To answer power with power, the Jedi way this is',

    // type code here for "relation_one" field

    signedDate: new Date('2023-11-14'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const AmendmentsData = [
  {
    // type code here for "relation_one" field

    type: 'Supplement',

    amount: 13.22,

    description: 'Luminous beings are we - not this crude matter.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    type: 'Insurance Claim',

    amount: 31.53,

    description: 'Your weapons, you will not need them.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    type: 'Insurance Claim',

    amount: 43.28,

    description: 'Truly wonderful, the mind of a child is.',

    // type code here for "relation_one" field
  },
];

async function associateContactWithAssigneduserid() {
  const relatedAssigneduserid0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact0 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contact0?.setAssigneduserid) {
    await Contact0.setAssigneduserid(relatedAssigneduserid0);
  }

  const relatedAssigneduserid1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact1 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contact1?.setAssigneduserid) {
    await Contact1.setAssigneduserid(relatedAssigneduserid1);
  }

  const relatedAssigneduserid2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact2 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contact2?.setAssigneduserid) {
    await Contact2.setAssigneduserid(relatedAssigneduserid2);
  }
}

async function associateContactWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact0 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contact0?.setCreatedby) {
    await Contact0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact1 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contact1?.setCreatedby) {
    await Contact1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact2 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contact2?.setCreatedby) {
    await Contact2.setCreatedby(relatedCreatedby2);
  }
}

async function associateContactWithUpdatedby() {
  const relatedUpdatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact0 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contact0?.setUpdatedby) {
    await Contact0.setUpdatedby(relatedUpdatedby0);
  }

  const relatedUpdatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact1 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contact1?.setUpdatedby) {
    await Contact1.setUpdatedby(relatedUpdatedby1);
  }

  const relatedUpdatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact2 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contact2?.setUpdatedby) {
    await Contact2.setUpdatedby(relatedUpdatedby2);
  }
}

async function associateAddressWithContactid() {
  const relatedContactid0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Address0 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Address0?.setContactid) {
    await Address0.setContactid(relatedContactid0);
  }

  const relatedContactid1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Address1 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Address1?.setContactid) {
    await Address1.setContactid(relatedContactid1);
  }

  const relatedContactid2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Address2 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Address2?.setContactid) {
    await Address2.setContactid(relatedContactid2);
  }
}

async function associateAddressWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Address0 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Address0?.setJobid) {
    await Address0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Address1 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Address1?.setJobid) {
    await Address1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Address2 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Address2?.setJobid) {
    await Address2.setJobid(relatedJobid2);
  }
}

async function associateAddressWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Address0 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Address0?.setCreatedby) {
    await Address0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Address1 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Address1?.setCreatedby) {
    await Address1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Address2 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Address2?.setCreatedby) {
    await Address2.setCreatedby(relatedCreatedby2);
  }
}

async function associateJobWithContactid() {
  const relatedContactid0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Job0 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Job0?.setContactid) {
    await Job0.setContactid(relatedContactid0);
  }

  const relatedContactid1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Job1 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Job1?.setContactid) {
    await Job1.setContactid(relatedContactid1);
  }

  const relatedContactid2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Job2 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Job2?.setContactid) {
    await Job2.setContactid(relatedContactid2);
  }
}

async function associateJobWithOrderid() {
  const relatedOrderid0 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Job0 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Job0?.setOrderid) {
    await Job0.setOrderid(relatedOrderid0);
  }

  const relatedOrderid1 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Job1 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Job1?.setOrderid) {
    await Job1.setOrderid(relatedOrderid1);
  }

  const relatedOrderid2 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Job2 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Job2?.setOrderid) {
    await Job2.setOrderid(relatedOrderid2);
  }
}

async function associateJobWithAssigneduserid() {
  const relatedAssigneduserid0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job0 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Job0?.setAssigneduserid) {
    await Job0.setAssigneduserid(relatedAssigneduserid0);
  }

  const relatedAssigneduserid1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job1 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Job1?.setAssigneduserid) {
    await Job1.setAssigneduserid(relatedAssigneduserid1);
  }

  const relatedAssigneduserid2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job2 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Job2?.setAssigneduserid) {
    await Job2.setAssigneduserid(relatedAssigneduserid2);
  }
}

async function associateJobWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job0 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Job0?.setCreatedby) {
    await Job0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job1 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Job1?.setCreatedby) {
    await Job1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job2 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Job2?.setCreatedby) {
    await Job2.setCreatedby(relatedCreatedby2);
  }
}

async function associateJobWithUpdatedby() {
  const relatedUpdatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job0 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Job0?.setUpdatedby) {
    await Job0.setUpdatedby(relatedUpdatedby0);
  }

  const relatedUpdatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job1 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Job1?.setUpdatedby) {
    await Job1.setUpdatedby(relatedUpdatedby1);
  }

  const relatedUpdatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job2 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Job2?.setUpdatedby) {
    await Job2.setUpdatedby(relatedUpdatedby2);
  }
}

async function associateEstimateWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setJobid) {
    await Estimate0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setJobid) {
    await Estimate1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setJobid) {
    await Estimate2.setJobid(relatedJobid2);
  }
}

async function associateEstimateWithContactid() {
  const relatedContactid0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setContactid) {
    await Estimate0.setContactid(relatedContactid0);
  }

  const relatedContactid1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setContactid) {
    await Estimate1.setContactid(relatedContactid1);
  }

  const relatedContactid2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setContactid) {
    await Estimate2.setContactid(relatedContactid2);
  }
}

async function associateEstimateWithTemplateid() {
  const relatedTemplateid0 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setTemplateid) {
    await Estimate0.setTemplateid(relatedTemplateid0);
  }

  const relatedTemplateid1 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setTemplateid) {
    await Estimate1.setTemplateid(relatedTemplateid1);
  }

  const relatedTemplateid2 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setTemplateid) {
    await Estimate2.setTemplateid(relatedTemplateid2);
  }
}

async function associateEstimateWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setCreatedby) {
    await Estimate0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setCreatedby) {
    await Estimate1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setCreatedby) {
    await Estimate2.setCreatedby(relatedCreatedby2);
  }
}

async function associateEstimateWithUpdatedby() {
  const relatedUpdatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setUpdatedby) {
    await Estimate0.setUpdatedby(relatedUpdatedby0);
  }

  const relatedUpdatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setUpdatedby) {
    await Estimate1.setUpdatedby(relatedUpdatedby1);
  }

  const relatedUpdatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setUpdatedby) {
    await Estimate2.setUpdatedby(relatedUpdatedby2);
  }
}

async function associateTemplateWithTradeid() {
  const relatedTradeid0 = await Trades.findOne({
    offset: Math.floor(Math.random() * (await Trades.count())),
  });
  const Template0 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Template0?.setTradeid) {
    await Template0.setTradeid(relatedTradeid0);
  }

  const relatedTradeid1 = await Trades.findOne({
    offset: Math.floor(Math.random() * (await Trades.count())),
  });
  const Template1 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Template1?.setTradeid) {
    await Template1.setTradeid(relatedTradeid1);
  }

  const relatedTradeid2 = await Trades.findOne({
    offset: Math.floor(Math.random() * (await Trades.count())),
  });
  const Template2 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Template2?.setTradeid) {
    await Template2.setTradeid(relatedTradeid2);
  }
}

async function associateTemplateWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Template0 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Template0?.setCreatedby) {
    await Template0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Template1 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Template1?.setCreatedby) {
    await Template1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Template2 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Template2?.setCreatedby) {
    await Template2.setCreatedby(relatedCreatedby2);
  }
}

async function associateTemplateWithUpdatedby() {
  const relatedUpdatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Template0 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Template0?.setUpdatedby) {
    await Template0.setUpdatedby(relatedUpdatedby0);
  }

  const relatedUpdatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Template1 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Template1?.setUpdatedby) {
    await Template1.setUpdatedby(relatedUpdatedby1);
  }

  const relatedUpdatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Template2 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Template2?.setUpdatedby) {
    await Template2.setUpdatedby(relatedUpdatedby2);
  }
}

async function associateUserWithImageid() {
  const relatedImageid0 = await Images.findOne({
    offset: Math.floor(Math.random() * (await Images.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setImageid) {
    await User0.setImageid(relatedImageid0);
  }

  const relatedImageid1 = await Images.findOne({
    offset: Math.floor(Math.random() * (await Images.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setImageid) {
    await User1.setImageid(relatedImageid1);
  }

  const relatedImageid2 = await Images.findOne({
    offset: Math.floor(Math.random() * (await Images.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setImageid) {
    await User2.setImageid(relatedImageid2);
  }
}

async function associateUserWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setCreatedby) {
    await User0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setCreatedby) {
    await User1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setCreatedby) {
    await User2.setCreatedby(relatedCreatedby2);
  }
}

async function associateUserWithUpdatedby() {
  const relatedUpdatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setUpdatedby) {
    await User0.setUpdatedby(relatedUpdatedby0);
  }

  const relatedUpdatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setUpdatedby) {
    await User1.setUpdatedby(relatedUpdatedby1);
  }

  const relatedUpdatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setUpdatedby) {
    await User2.setUpdatedby(relatedUpdatedby2);
  }
}

// Similar logic for "relation_many"

async function associateInvoiceWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setJobid) {
    await Invoice0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setJobid) {
    await Invoice1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setJobid) {
    await Invoice2.setJobid(relatedJobid2);
  }
}

async function associateInvoiceWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setCreatedby) {
    await Invoice0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setCreatedby) {
    await Invoice1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setCreatedby) {
    await Invoice2.setCreatedby(relatedCreatedby2);
  }
}

async function associateInvoiceWithUpdatedby() {
  const relatedUpdatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setUpdatedby) {
    await Invoice0.setUpdatedby(relatedUpdatedby0);
  }

  const relatedUpdatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setUpdatedby) {
    await Invoice1.setUpdatedby(relatedUpdatedby1);
  }

  const relatedUpdatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setUpdatedby) {
    await Invoice2.setUpdatedby(relatedUpdatedby2);
  }
}

async function associateOrderWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setJobid) {
    await Order0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setJobid) {
    await Order1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setJobid) {
    await Order2.setJobid(relatedJobid2);
  }
}

async function associateOrderWithEstimateid() {
  const relatedEstimateid0 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setEstimateid) {
    await Order0.setEstimateid(relatedEstimateid0);
  }

  const relatedEstimateid1 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setEstimateid) {
    await Order1.setEstimateid(relatedEstimateid1);
  }

  const relatedEstimateid2 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setEstimateid) {
    await Order2.setEstimateid(relatedEstimateid2);
  }
}

async function associateOrderWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setCreatedby) {
    await Order0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setCreatedby) {
    await Order1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setCreatedby) {
    await Order2.setCreatedby(relatedCreatedby2);
  }
}

async function associateImageWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image0 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Image0?.setJobid) {
    await Image0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image1 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Image1?.setJobid) {
    await Image1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image2 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Image2?.setJobid) {
    await Image2.setJobid(relatedJobid2);
  }
}

async function associateImageWithUserid() {
  const relatedUserid0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image0 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Image0?.setUserid) {
    await Image0.setUserid(relatedUserid0);
  }

  const relatedUserid1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image1 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Image1?.setUserid) {
    await Image1.setUserid(relatedUserid1);
  }

  const relatedUserid2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image2 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Image2?.setUserid) {
    await Image2.setUserid(relatedUserid2);
  }
}

async function associateImageWithDocumentid() {
  const relatedDocumentid0 = await Documents.findOne({
    offset: Math.floor(Math.random() * (await Documents.count())),
  });
  const Image0 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Image0?.setDocumentid) {
    await Image0.setDocumentid(relatedDocumentid0);
  }

  const relatedDocumentid1 = await Documents.findOne({
    offset: Math.floor(Math.random() * (await Documents.count())),
  });
  const Image1 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Image1?.setDocumentid) {
    await Image1.setDocumentid(relatedDocumentid1);
  }

  const relatedDocumentid2 = await Documents.findOne({
    offset: Math.floor(Math.random() * (await Documents.count())),
  });
  const Image2 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Image2?.setDocumentid) {
    await Image2.setDocumentid(relatedDocumentid2);
  }
}

async function associateImageWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image0 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Image0?.setCreatedby) {
    await Image0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image1 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Image1?.setCreatedby) {
    await Image1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image2 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Image2?.setCreatedby) {
    await Image2.setCreatedby(relatedCreatedby2);
  }
}

async function associateDocumentWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document0 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Document0?.setJobid) {
    await Document0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document1 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Document1?.setJobid) {
    await Document1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document2 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Document2?.setJobid) {
    await Document2.setJobid(relatedJobid2);
  }
}

async function associateDocumentWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document0 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Document0?.setCreatedby) {
    await Document0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document1 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Document1?.setCreatedby) {
    await Document1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document2 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Document2?.setCreatedby) {
    await Document2.setCreatedby(relatedCreatedby2);
  }
}

async function associateEmailWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Email0 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Email0?.setJobid) {
    await Email0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Email1 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Email1?.setJobid) {
    await Email1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Email2 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Email2?.setJobid) {
    await Email2.setJobid(relatedJobid2);
  }
}

async function associateEmailWithUserid() {
  const relatedUserid0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email0 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Email0?.setUserid) {
    await Email0.setUserid(relatedUserid0);
  }

  const relatedUserid1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email1 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Email1?.setUserid) {
    await Email1.setUserid(relatedUserid1);
  }

  const relatedUserid2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email2 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Email2?.setUserid) {
    await Email2.setUserid(relatedUserid2);
  }
}

async function associateEmailWithContactid() {
  const relatedContactid0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Email0 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Email0?.setContactid) {
    await Email0.setContactid(relatedContactid0);
  }

  const relatedContactid1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Email1 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Email1?.setContactid) {
    await Email1.setContactid(relatedContactid1);
  }

  const relatedContactid2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Email2 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Email2?.setContactid) {
    await Email2.setContactid(relatedContactid2);
  }
}

async function associateEmailWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email0 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Email0?.setCreatedby) {
    await Email0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email1 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Email1?.setCreatedby) {
    await Email1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email2 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Email2?.setCreatedby) {
    await Email2.setCreatedby(relatedCreatedby2);
  }
}

async function associateChatWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Chat0 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Chat0?.setJobid) {
    await Chat0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Chat1 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Chat1?.setJobid) {
    await Chat1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Chat2 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Chat2?.setJobid) {
    await Chat2.setJobid(relatedJobid2);
  }
}

async function associateChatWithSenderid() {
  const relatedSenderid0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat0 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Chat0?.setSenderid) {
    await Chat0.setSenderid(relatedSenderid0);
  }

  const relatedSenderid1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat1 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Chat1?.setSenderid) {
    await Chat1.setSenderid(relatedSenderid1);
  }

  const relatedSenderid2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat2 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Chat2?.setSenderid) {
    await Chat2.setSenderid(relatedSenderid2);
  }
}

async function associateChatWithReceiverid() {
  const relatedReceiverid0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat0 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Chat0?.setReceiverid) {
    await Chat0.setReceiverid(relatedReceiverid0);
  }

  const relatedReceiverid1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat1 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Chat1?.setReceiverid) {
    await Chat1.setReceiverid(relatedReceiverid1);
  }

  const relatedReceiverid2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat2 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Chat2?.setReceiverid) {
    await Chat2.setReceiverid(relatedReceiverid2);
  }
}

async function associateAppointmentWithAssigneduserid() {
  const relatedAssigneduserid0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setAssigneduserid) {
    await Appointment0.setAssigneduserid(relatedAssigneduserid0);
  }

  const relatedAssigneduserid1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setAssigneduserid) {
    await Appointment1.setAssigneduserid(relatedAssigneduserid1);
  }

  const relatedAssigneduserid2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setAssigneduserid) {
    await Appointment2.setAssigneduserid(relatedAssigneduserid2);
  }
}

async function associateAppointmentWithContactid() {
  const relatedContactid0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setContactid) {
    await Appointment0.setContactid(relatedContactid0);
  }

  const relatedContactid1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setContactid) {
    await Appointment1.setContactid(relatedContactid1);
  }

  const relatedContactid2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setContactid) {
    await Appointment2.setContactid(relatedContactid2);
  }
}

async function associateAppointmentWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setJobid) {
    await Appointment0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setJobid) {
    await Appointment1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setJobid) {
    await Appointment2.setJobid(relatedJobid2);
  }
}

async function associateAppointmentWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setCreatedby) {
    await Appointment0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setCreatedby) {
    await Appointment1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setCreatedby) {
    await Appointment2.setCreatedby(relatedCreatedby2);
  }
}

async function associateAppointmentWithUpdatedby() {
  const relatedUpdatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setUpdatedby) {
    await Appointment0.setUpdatedby(relatedUpdatedby0);
  }

  const relatedUpdatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setUpdatedby) {
    await Appointment1.setUpdatedby(relatedUpdatedby1);
  }

  const relatedUpdatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setUpdatedby) {
    await Appointment2.setUpdatedby(relatedUpdatedby2);
  }
}

async function associateTaskWithAssignedtouserid() {
  const relatedAssignedtouserid0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setAssignedtouserid) {
    await Task0.setAssignedtouserid(relatedAssignedtouserid0);
  }

  const relatedAssignedtouserid1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setAssignedtouserid) {
    await Task1.setAssignedtouserid(relatedAssignedtouserid1);
  }

  const relatedAssignedtouserid2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setAssignedtouserid) {
    await Task2.setAssignedtouserid(relatedAssignedtouserid2);
  }
}

async function associateTaskWithAppointmentid() {
  const relatedAppointmentid0 = await Appointments.findOne({
    offset: Math.floor(Math.random() * (await Appointments.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setAppointmentid) {
    await Task0.setAppointmentid(relatedAppointmentid0);
  }

  const relatedAppointmentid1 = await Appointments.findOne({
    offset: Math.floor(Math.random() * (await Appointments.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setAppointmentid) {
    await Task1.setAppointmentid(relatedAppointmentid1);
  }

  const relatedAppointmentid2 = await Appointments.findOne({
    offset: Math.floor(Math.random() * (await Appointments.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setAppointmentid) {
    await Task2.setAppointmentid(relatedAppointmentid2);
  }
}

async function associateTaskWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setJobid) {
    await Task0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setJobid) {
    await Task1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setJobid) {
    await Task2.setJobid(relatedJobid2);
  }
}

async function associateTaskWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setCreatedby) {
    await Task0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setCreatedby) {
    await Task1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setCreatedby) {
    await Task2.setCreatedby(relatedCreatedby2);
  }
}

async function associateContractWithContactid() {
  const relatedContactid0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Contract0 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contract0?.setContactid) {
    await Contract0.setContactid(relatedContactid0);
  }

  const relatedContactid1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Contract1 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contract1?.setContactid) {
    await Contract1.setContactid(relatedContactid1);
  }

  const relatedContactid2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Contract2 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contract2?.setContactid) {
    await Contract2.setContactid(relatedContactid2);
  }
}

async function associateContractWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Contract0 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contract0?.setJobid) {
    await Contract0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Contract1 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contract1?.setJobid) {
    await Contract1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Contract2 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contract2?.setJobid) {
    await Contract2.setJobid(relatedJobid2);
  }
}

async function associateContractWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contract0 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contract0?.setCreatedby) {
    await Contract0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contract1 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contract1?.setCreatedby) {
    await Contract1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contract2 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contract2?.setCreatedby) {
    await Contract2.setCreatedby(relatedCreatedby2);
  }
}

async function associateAmendmentWithJobid() {
  const relatedJobid0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Amendment0 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Amendment0?.setJobid) {
    await Amendment0.setJobid(relatedJobid0);
  }

  const relatedJobid1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Amendment1 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Amendment1?.setJobid) {
    await Amendment1.setJobid(relatedJobid1);
  }

  const relatedJobid2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Amendment2 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Amendment2?.setJobid) {
    await Amendment2.setJobid(relatedJobid2);
  }
}

async function associateAmendmentWithCreatedby() {
  const relatedCreatedby0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Amendment0 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Amendment0?.setCreatedby) {
    await Amendment0.setCreatedby(relatedCreatedby0);
  }

  const relatedCreatedby1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Amendment1 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Amendment1?.setCreatedby) {
    await Amendment1.setCreatedby(relatedCreatedby1);
  }

  const relatedCreatedby2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Amendment2 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Amendment2?.setCreatedby) {
    await Amendment2.setCreatedby(relatedCreatedby2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Contacts.bulkCreate(ContactsData);

    await Addresses.bulkCreate(AddressesData);

    await Jobs.bulkCreate(JobsData);

    await Estimates.bulkCreate(EstimatesData);

    await Templates.bulkCreate(TemplatesData);

    await Trades.bulkCreate(TradesData);

    await Invoices.bulkCreate(InvoicesData);

    await Orders.bulkCreate(OrdersData);

    await Images.bulkCreate(ImagesData);

    await Documents.bulkCreate(DocumentsData);

    await Emails.bulkCreate(EmailsData);

    await Chats.bulkCreate(ChatsData);

    await Appointments.bulkCreate(AppointmentsData);

    await Tasks.bulkCreate(TasksData);

    await Contracts.bulkCreate(ContractsData);

    await Amendments.bulkCreate(AmendmentsData);

    await Promise.all([
      await associateContactWithAssigneduserid(),

      await associateContactWithCreatedby(),

      await associateContactWithUpdatedby(),

      await associateAddressWithContactid(),

      await associateAddressWithJobid(),

      await associateAddressWithCreatedby(),

      await associateJobWithContactid(),

      await associateJobWithOrderid(),

      await associateJobWithAssigneduserid(),

      await associateJobWithCreatedby(),

      await associateJobWithUpdatedby(),

      await associateEstimateWithJobid(),

      await associateEstimateWithContactid(),

      await associateEstimateWithTemplateid(),

      await associateEstimateWithCreatedby(),

      await associateEstimateWithUpdatedby(),

      await associateTemplateWithTradeid(),

      await associateTemplateWithCreatedby(),

      await associateTemplateWithUpdatedby(),

      await associateUserWithImageid(),

      await associateUserWithCreatedby(),

      await associateUserWithUpdatedby(),

      // Similar logic for "relation_many"

      await associateInvoiceWithJobid(),

      await associateInvoiceWithCreatedby(),

      await associateInvoiceWithUpdatedby(),

      await associateOrderWithJobid(),

      await associateOrderWithEstimateid(),

      await associateOrderWithCreatedby(),

      await associateImageWithJobid(),

      await associateImageWithUserid(),

      await associateImageWithDocumentid(),

      await associateImageWithCreatedby(),

      await associateDocumentWithJobid(),

      await associateDocumentWithCreatedby(),

      await associateEmailWithJobid(),

      await associateEmailWithUserid(),

      await associateEmailWithContactid(),

      await associateEmailWithCreatedby(),

      await associateChatWithJobid(),

      await associateChatWithSenderid(),

      await associateChatWithReceiverid(),

      await associateAppointmentWithAssigneduserid(),

      await associateAppointmentWithContactid(),

      await associateAppointmentWithJobid(),

      await associateAppointmentWithCreatedby(),

      await associateAppointmentWithUpdatedby(),

      await associateTaskWithAssignedtouserid(),

      await associateTaskWithAppointmentid(),

      await associateTaskWithJobid(),

      await associateTaskWithCreatedby(),

      await associateContractWithContactid(),

      await associateContractWithJobid(),

      await associateContractWithCreatedby(),

      await associateAmendmentWithJobid(),

      await associateAmendmentWithCreatedby(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contacts', null, {});

    await queryInterface.bulkDelete('addresses', null, {});

    await queryInterface.bulkDelete('jobs', null, {});

    await queryInterface.bulkDelete('estimates', null, {});

    await queryInterface.bulkDelete('templates', null, {});

    await queryInterface.bulkDelete('trades', null, {});

    await queryInterface.bulkDelete('invoices', null, {});

    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('images', null, {});

    await queryInterface.bulkDelete('documents', null, {});

    await queryInterface.bulkDelete('emails', null, {});

    await queryInterface.bulkDelete('chats', null, {});

    await queryInterface.bulkDelete('appointments', null, {});

    await queryInterface.bulkDelete('tasks', null, {});

    await queryInterface.bulkDelete('contracts', null, {});

    await queryInterface.bulkDelete('amendments', null, {});
  },
};
