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
    firstName: 'Contact the tower',

    lastName: 'That goddamn Datamate',

    email: 'valentin.wolff@witting-thiel.info',

    phone: '(243) 069-9640 x7003',

    company: 'Gislason-Grant',

    status: 'Prospect',

    source: 'Facebook',

    crossReference: "How 'bout them Cowboys",

    // type code here for "relation_one" field
  },

  {
    firstName: 'Texas!',

    lastName: 'Reminds me of my old girlfriend Olga Goodntight',

    email: 'brooke@collier-greenholt.net',

    phone: '(412) 132-5518',

    company: 'Goldner-Witting',

    status: 'Lead',

    source: 'Other',

    crossReference: "That's messed up",

    // type code here for "relation_one" field
  },

  {
    firstName: 'Might be DQ time',

    lastName: "Y'all never listen to me",

    email: 'fletcher_carter@dubuque-pfannerstill.co',

    phone: '429-871-5291 x7314',

    company: 'Oberbrunner-Oberbrunner',

    status: 'Customer',

    source: 'Google Ads',

    crossReference: 'Got depression, Smith and Wessen',

    // type code here for "relation_one" field
  },
];

const AddressesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'Might be DQ time',

    suite_apt_unit: 'Got depression, Smith and Wessen',

    city: "C'mon Naomi",

    state: 'AK',

    zip: 'Reminds me of my old girlfriend Olga Goodntight',

    country: 'Come on now',

    type: 'Billing',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: "That Barbala couldn't fly his way out of a wet paper bag",

    suite_apt_unit: 'That goddamn Datamate',

    city: 'Contact the tower',

    state: 'CA',

    zip: 'Like a red-headed stepchild',

    country: "That Barbala couldn't fly his way out of a wet paper bag",

    type: 'Billing',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'So I was walking Oscar',

    suite_apt_unit: "That Barbala couldn't fly his way out of a wet paper bag",

    city: 'Got depression, Smith and Wessen',

    state: 'AL',

    zip: 'Always the last one to the party',

    country: 'Texas!',

    type: 'Location',
  },
];

const JobsData = [
  {
    Name: 'So I was walking Oscar',

    type: 'Inspection',

    category: 'Residential',

    status: 'Approved',

    startDate: new Date('2023-09-22'),

    endDate: new Date('2023-11-05'),

    description:
      'Soon will I rest, yes, forever sleep. Earned it I have. Twilight is upon me, soon night must fall.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: 'Standby',

    type: 'New',

    category: 'Commercial ',

    status: 'Active',

    startDate: new Date('2024-03-22'),

    endDate: new Date('2024-05-03'),

    description: 'Adventure. Excitement. A Jedi craves not these things.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: 'My boss gonna fire me',

    type: 'Warranty',

    category: 'Commercial ',

    status: 'Closed',

    startDate: new Date('2023-08-03'),

    endDate: new Date('2023-07-10'),

    description:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const EstimatesData = [
  {
    description: 'Good relations with the Wookiees, I have.',

    additionalNotes: 'To answer power with power, the Jedi way this is',

    price: 49.99,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Mudhole? Slimy? My home this is!',

    additionalNotes:
      'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',

    price: 67.33,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    additionalNotes: 'Luminous beings are we - not this crude matter.',

    price: 13.68,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TemplatesData = [
  {
    name: 'Ernst Mayr',

    description: 'Younglings, younglings gather ’round.',

    // type code here for "relation_one" field
  },

  {
    name: 'Jean Piaget',

    description: 'Around the survivors a perimeter create.',

    // type code here for "relation_one" field
  },

  {
    name: 'Pierre Simon de Laplace',

    description:
      'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    // type code here for "relation_one" field
  },
];

const TradesData = [
  {
    Name: 'Metal',
  },

  {
    Name: 'Aluminum/Flashing',
  },

  {
    Name: 'Box Gutters',
  },
];

const InvoicesData = [
  {
    invoiceNumber: "That's messed up",

    invoiceDate: new Date('2024-02-23'),

    terms: 'Net 7 Days',

    approvedJobValue: 54.95,

    invoicedAmount: 39.68,

    balanceAmount: 97.19,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'I tell you what',

    invoiceDate: new Date('2024-04-16'),

    terms: 'Net 30 Days',

    approvedJobValue: 60.33,

    invoicedAmount: 31.46,

    balanceAmount: 79.33,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'That damn diabetes',

    invoiceDate: new Date('2024-05-10'),

    terms: 'Net 30 Days',

    approvedJobValue: 46.17,

    invoicedAmount: 87.32,

    balanceAmount: 87.64,

    // type code here for "relation_one" field
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: "Y'all never listen to me",

    totalAmount: 78.26,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'I want my damn cart back',

    totalAmount: 42.47,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'That damn Bill Stull',

    totalAmount: 50.62,
  },
];

const ImagesData = [
  {
    name: 'Jean Baptiste Lamarck',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Emil Kraepelin',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Marcello Malpighi',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const DocumentsData = [
  {
    // type code here for "relation_one" field

    name: 'Justus Liebig',

    active: false,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'Gertrude Belle Elion',

    active: true,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'Neils Bohr',

    active: false,

    // type code here for "files" field
  },
];

const EmailsData = [
  {
    // type code here for "relation_one" field

    toAddress: "That Barbala couldn't fly his way out of a wet paper bag",

    fromAddress: 'I tell you what',

    isInbound: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Truly wonderful, the mind of a child is.',

    body: 'Yes, a Jedi’s strength flows from the Force. But beware of the dark side. Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny, consume you it will, as it did Obi-Wan’s apprentice.',
  },

  {
    // type code here for "relation_one" field

    toAddress: 'Got depression, Smith and Wessen',

    fromAddress: 'Got depression, Smith and Wessen',

    isInbound: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Truly wonderful, the mind of a child is.',

    body: 'Your weapons, you will not need them.',
  },

  {
    // type code here for "relation_one" field

    toAddress: 'I want my damn cart back',

    fromAddress: 'Let me tell ya',

    isInbound: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Strong is Vader. Mind what you have learned. Save you it can.',

    body: 'Use your feelings, Obi-Wan, and find him you will.',
  },
];

const ChatsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message: 'Not if anything to say about it I have',

    sentTime: new Date('2024-03-29'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message:
      'Do not assume anything Obi-Wan. Clear your mind must be if you are to discover the real villains behind this plot.',

    sentTime: new Date('2023-11-30'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message: 'Your weapons, you will not need them.',

    sentTime: new Date('2023-08-19'),
  },
];

const AppointmentsData = [
  {
    subject: 'I tell you what',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-12-29'),

    endTime: new Date('2024-04-24'),

    description: 'Hmm. In the end, cowards are those who follow the dark side.',

    location: 'So I was walking Oscar',

    // type code here for "relation_one" field

    reminder: new Date('2024-03-09'),
  },

  {
    subject: 'So I was walking Oscar',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-11-19'),

    endTime: new Date('2023-08-31'),

    description: 'Your weapons, you will not need them.',

    location: 'That damn Bill Stull',

    // type code here for "relation_one" field

    reminder: new Date('2023-12-18'),
  },

  {
    subject: 'Texas!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-11-03'),

    endTime: new Date('2023-10-17'),

    description:
      'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained. A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away - to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',

    location: 'Reminds me of my old girlfriend Olga Goodntight',

    // type code here for "relation_one" field

    reminder: new Date('2023-09-25'),
  },
];

const TasksData = [
  {
    subject: 'So I was walking Oscar',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2024-03-19'),

    // type code here for "relation_one" field

    description:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    priority: 'Medium',

    completed: true,
  },

  {
    subject: 'I want my 5$ back',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2024-01-07'),

    // type code here for "relation_one" field

    description: 'At an end your rule is, and not short enough it was!',

    priority: 'Medium',

    completed: true,
  },

  {
    subject: 'I tell you what',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2024-02-23'),

    // type code here for "relation_one" field

    description: 'Not if anything to say about it I have',

    priority: 'High',

    completed: true,
  },
];

const ContractsData = [
  {
    name: 'Werner Heisenberg',

    amount: 70.76,

    body: 'Truly wonderful, the mind of a child is.',

    // type code here for "relation_one" field

    signedDate: new Date('2024-03-28'),

    // type code here for "relation_one" field
  },

  {
    name: 'Lucretius',

    amount: 43.16,

    body: 'Already know you that which you need.',

    // type code here for "relation_one" field

    signedDate: new Date('2023-12-11'),

    // type code here for "relation_one" field
  },

  {
    name: 'Jean Baptiste Lamarck',

    amount: 49.95,

    body: 'Use your feelings, Obi-Wan, and find him you will.',

    // type code here for "relation_one" field

    signedDate: new Date('2024-03-04'),

    // type code here for "relation_one" field
  },
];

const AmendmentsData = [
  {
    // type code here for "relation_one" field

    type: 'Change Order',

    amount: 11.07,

    description: 'Truly wonderful, the mind of a child is.',
  },

  {
    // type code here for "relation_one" field

    type: 'Change Order',

    amount: 47.81,

    description: 'Always pass on what you have learned.',
  },

  {
    // type code here for "relation_one" field

    type: 'Change Order',

    amount: 70.72,

    description:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',
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

      await associateAddressWithContactid(),

      await associateAddressWithJobid(),

      await associateJobWithContactid(),

      await associateJobWithOrderid(),

      await associateJobWithAssigneduserid(),

      await associateEstimateWithJobid(),

      await associateEstimateWithContactid(),

      await associateEstimateWithTemplateid(),

      await associateTemplateWithTradeid(),

      await associateUserWithImageid(),

      await associateInvoiceWithJobid(),

      await associateOrderWithJobid(),

      await associateOrderWithEstimateid(),

      await associateImageWithJobid(),

      await associateImageWithUserid(),

      await associateImageWithDocumentid(),

      await associateDocumentWithJobid(),

      await associateEmailWithJobid(),

      await associateEmailWithUserid(),

      await associateEmailWithContactid(),

      await associateChatWithJobid(),

      await associateChatWithSenderid(),

      await associateChatWithReceiverid(),

      await associateAppointmentWithAssigneduserid(),

      await associateAppointmentWithContactid(),

      await associateAppointmentWithJobid(),

      await associateTaskWithAssignedtouserid(),

      await associateTaskWithAppointmentid(),

      await associateTaskWithJobid(),

      await associateContractWithContactid(),

      await associateContractWithJobid(),

      await associateAmendmentWithJobid(),
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
