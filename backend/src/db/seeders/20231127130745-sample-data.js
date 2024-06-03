const db = require('../models');
const Users = db.users;

const Contacts = db.contacts;

const Addresses = db.addresses;

const Estimates = db.estimates;

const Jobs = db.jobs;

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

const Milestones = db.milestones;

const ContactsData = [
  {
    firstName: 'Let me tell ya',

    lastName: 'My boss gonna fire me',

    email: 'renay@kohler.org',

    phone: '975-217-2065 x23777',

    company: 'Stark-Fahey',

    status: 'Customer',

    source: 'Google Ads',

    crossReference: 'So I was walking Oscar',

    // type code here for "relation_one" field
  },

  {
    firstName: 'That damn diabetes',

    lastName: 'Always the last one to the party',

    email: 'rhona_price@luettgen.com',

    phone: '945-876-2106',

    company: 'Grady and Sons',

    status: 'Customer',

    source: 'Other',

    crossReference: 'Always the last one to the party',

    // type code here for "relation_one" field
  },

  {
    firstName: 'I want my 5$ back',

    lastName: "That's messed up",

    email: 'domenica_kub@conn.com',

    phone: '(996) 243-7453 x4952',

    company: 'Barrows-Mraz',

    status: 'Prospect',

    source: 'Google Ads',

    crossReference: "Y'all never listen to me",

    // type code here for "relation_one" field
  },

  {
    firstName: 'Yup',

    lastName: 'Like a red-headed stepchild',

    email: 'bulah@rosenbaum.name',

    phone: '328-737-2621 x141',

    company: 'Legros, Flatley and Block',

    status: 'Lead',

    source: 'Website',

    crossReference: 'Come on now',

    // type code here for "relation_one" field
  },

  {
    firstName: 'Might be DQ time',

    lastName: "How 'bout them Cowboys",

    email: 'fred_gutkowski@reichert.name',

    phone: '913.521.0846',

    company: 'Hintz-Jaskolski',

    status: 'Customer',

    source: 'Other',

    crossReference: 'That damn Bill Stull',

    // type code here for "relation_one" field
  },
];

const AddressesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'I tell you what',

    suite_apt_unit: 'Like a red-headed stepchild',

    city: "Goin' hog huntin'",

    state: 'CA',

    zip: "It's around here somewhere",

    country: 'Yup',

    type: 'Mailing',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'I tell you what',

    suite_apt_unit: 'Turd gone wrong',

    city: 'Come on now',

    state: 'AK',

    zip: 'I tell you what',

    country: 'That damn gimble',

    type: 'Billing',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: "Y'all never listen to me",

    suite_apt_unit: 'No one tells me shit',

    city: 'Texas!',

    state: 'CA',

    zip: 'Always the last one to the party',

    country: 'Always the last one to the party',

    type: 'Location',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'Always the last one to the party',

    suite_apt_unit: 'Yup',

    city: "I'm washing my hands of it",

    state: 'AL',

    zip: 'I want my damn cart back',

    country: 'I tell you what',

    type: 'Location',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'So I was walking Oscar',

    suite_apt_unit: "I'm washing my hands of it",

    city: 'I want my 5$ back',

    state: 'AR',

    zip: 'Got depression, Smith and Wessen',

    country: 'Let me tell ya',

    type: 'Mailing',
  },
];

const EstimatesData = [
  {
    description:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    additionalNotes: 'Ow, ow, OW! On my ear you are!',

    price: 15.92,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Around the survivors a perimeter create.',

    additionalNotes:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    price: 91.36,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Younglings, younglings gather ’round.',

    additionalNotes:
      'Hmm. In the end, cowards are those who follow the dark side.',

    price: 48.59,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'To answer power with power, the Jedi way this is',

    additionalNotes:
      'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    price: 15.81,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Luminous beings are we - not this crude matter.',

    additionalNotes: 'Adventure. Excitement. A Jedi craves not these things.',

    price: 82.84,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const JobsData = [
  {
    Name: "That Barbala couldn't fly his way out of a wet paper bag",

    type: 'Warranty',

    category: 'Residential',

    status: 'Invoiced',

    startDate: new Date('2023-06-17'),

    endDate: new Date('2024-04-22'),

    description: 'That is why you fail.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: "It's around here somewhere",

    type: 'Repair',

    category: 'Residential',

    status: 'Closed',

    startDate: new Date('2023-09-29'),

    endDate: new Date('2024-03-28'),

    description:
      'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained. A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away - to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: 'My boss gonna fire me',

    type: 'Warranty',

    category: 'Property Management',

    status: 'Active',

    startDate: new Date('2023-11-13'),

    endDate: new Date('2023-09-16'),

    description: 'You will find only what you bring in.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: "That's messed up",

    type: 'Warranty',

    category: 'Property Management',

    status: 'Approved',

    startDate: new Date('2024-01-26'),

    endDate: new Date('2023-11-06'),

    description:
      'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: 'Turd gone wrong',

    type: 'New',

    category: 'Property Management',

    status: 'Invoiced',

    startDate: new Date('2023-07-09'),

    endDate: new Date('2023-08-16'),

    description:
      'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TemplatesData = [
  {
    name: 'Galileo Galilei',

    description: 'Reckless he is. Matters are worse.',

    // type code here for "relation_one" field
  },

  {
    name: 'Claude Bernard',

    description:
      'Always two there are, no more, no less. A master and an apprentice.',

    // type code here for "relation_one" field
  },

  {
    name: 'Max Planck',

    description: 'That is why you fail.',

    // type code here for "relation_one" field
  },

  {
    name: 'Louis Pasteur',

    description:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    // type code here for "relation_one" field
  },

  {
    name: 'Carl Gauss (Karl Friedrich Gauss)',

    description:
      'Do not assume anything Obi-Wan. Clear your mind must be if you are to discover the real villains behind this plot.',

    // type code here for "relation_one" field
  },
];

const TradesData = [
  {
    Name: 'Fascia',
  },

  {
    Name: 'Ventilation',
  },

  {
    Name: 'Chimney Cap',
  },

  {
    Name: 'Soffit/Fascia',
  },

  {
    Name: 'Siding',
  },
];

const InvoicesData = [
  {
    invoiceNumber: 'No one tells me shit',

    invoiceDate: new Date('2023-11-23'),

    terms: 'Net 60 Days',

    approvedJobValue: 35.37,

    invoicedAmount: 15.73,

    balanceAmount: 38.83,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'I want my damn cart back',

    invoiceDate: new Date('2023-09-27'),

    terms: 'By Due Date',

    approvedJobValue: 37.11,

    invoicedAmount: 95.27,

    balanceAmount: 88.16,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'Turd gone wrong',

    invoiceDate: new Date('2023-06-22'),

    terms: 'Net 7 Days',

    approvedJobValue: 38.91,

    invoicedAmount: 13.48,

    balanceAmount: 42.27,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'Reminds me of my old girlfriend Olga Goodntight',

    invoiceDate: new Date('2024-01-25'),

    terms: 'By Due Date',

    approvedJobValue: 73.08,

    invoicedAmount: 11.96,

    balanceAmount: 57.61,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: "That's messed up",

    invoiceDate: new Date('2024-01-31'),

    terms: 'By Due Date',

    approvedJobValue: 51.95,

    invoicedAmount: 72.22,

    balanceAmount: 36.65,

    // type code here for "relation_one" field
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'I want my 5$ back',

    totalAmount: 22.87,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'I want my damn cart back',

    totalAmount: 34.86,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: "How 'bout them Cowboys",

    totalAmount: 11.74,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'I got that scurvy',

    totalAmount: 21.43,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: "Goin' hog huntin'",

    totalAmount: 15.38,
  },
];

const ImagesData = [
  {
    name: 'James Watson',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Arthur Eddington',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Francis Crick',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Justus Liebig',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Arthur Eddington',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const DocumentsData = [
  {
    // type code here for "relation_one" field

    name: 'Paul Dirac',

    active: true,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'William Harvey',

    active: false,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'Rudolf Virchow',

    active: false,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'Alfred Kinsey',

    active: true,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'Alfred Binet',

    active: true,

    // type code here for "files" field
  },
];

const EmailsData = [
  {
    // type code here for "relation_one" field

    toAddress: 'Yup',

    fromAddress: 'Let me tell ya',

    isInbound: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Already know you that which you need.',

    body: 'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained. A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away - to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',
  },

  {
    // type code here for "relation_one" field

    toAddress: 'Like a red-headed stepchild',

    fromAddress: "Y'all never listen to me",

    isInbound: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Truly wonderful, the mind of a child is.',

    body: 'Ow, ow, OW! On my ear you are!',
  },

  {
    // type code here for "relation_one" field

    toAddress: "That's messed up",

    fromAddress: 'Standby',

    isInbound: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Strong is Vader. Mind what you have learned. Save you it can.',

    body: 'Clear your mind must be, if you are to find the villains behind this plot.',
  },

  {
    // type code here for "relation_one" field

    toAddress: 'Like a red-headed stepchild',

    fromAddress: 'Texas!',

    isInbound: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Ow, ow, OW! On my ear you are!',

    body: 'Always pass on what you have learned.',
  },

  {
    // type code here for "relation_one" field

    toAddress: 'Turd gone wrong',

    fromAddress: 'Got depression, Smith and Wessen',

    isInbound: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'To answer power with power, the Jedi way this is',

    body: 'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',
  },
];

const ChatsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message:
      'Much to learn you still have my old padawan. ... This is just the beginning!',

    sentTime: new Date('2024-01-16'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message: 'Always pass on what you have learned.',

    sentTime: new Date('2023-08-05'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message: 'Already know you that which you need.',

    sentTime: new Date('2023-11-23'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message: 'Good relations with the Wookiees, I have.',

    sentTime: new Date('2024-02-28'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message:
      'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    sentTime: new Date('2023-09-24'),
  },
];

const AppointmentsData = [
  {
    subject: "That's messed up",

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2024-06-02'),

    endTime: new Date('2023-07-20'),

    description: 'Truly wonderful, the mind of a child is.',

    location: 'I tell you what',

    // type code here for "relation_one" field

    reminder: new Date('2023-07-31'),
  },

  {
    subject: "How 'bout them Cowboys",

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-09-08'),

    endTime: new Date('2023-10-10'),

    description: 'Luminous beings are we - not this crude matter.',

    location: 'I want my 5$ back',

    // type code here for "relation_one" field

    reminder: new Date('2023-09-06'),
  },

  {
    subject: 'That goddamn Datamate',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2024-03-09'),

    endTime: new Date('2023-11-03'),

    description: 'Younglings, younglings gather ’round.',

    location: "Y'all never listen to me",

    // type code here for "relation_one" field

    reminder: new Date('2024-05-24'),
  },

  {
    subject: "Goin' hog huntin'",

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2024-05-20'),

    endTime: new Date('2023-07-26'),

    description: 'To answer power with power, the Jedi way this is',

    location: 'I want my damn cart back',

    // type code here for "relation_one" field

    reminder: new Date('2024-01-22'),
  },

  {
    subject: 'I got that scurvy',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2024-01-18'),

    endTime: new Date('2023-12-06'),

    description:
      'Once you start down the dark path, forever will it dominate your destiny, consume you it will.',

    location: "C'mon Naomi",

    // type code here for "relation_one" field

    reminder: new Date('2024-04-11'),
  },
];

const TasksData = [
  {
    subject: "C'mon Naomi",

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2024-05-23'),

    // type code here for "relation_one" field

    description: 'Younglings, younglings gather ’round.',

    priority: 'Medium',

    completed: false,
  },

  {
    subject: 'Contact the tower',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2023-09-26'),

    // type code here for "relation_one" field

    description: 'Luminous beings are we - not this crude matter.',

    priority: 'High',

    completed: false,
  },

  {
    subject: 'Standby',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2024-02-22'),

    // type code here for "relation_one" field

    description: 'Good relations with the Wookiees, I have.',

    priority: 'High',

    completed: false,
  },

  {
    subject: 'Come on now',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2024-03-22'),

    // type code here for "relation_one" field

    description: 'To answer power with power, the Jedi way this is',

    priority: 'Medium',

    completed: true,
  },

  {
    subject: "It's around here somewhere",

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2023-06-27'),

    // type code here for "relation_one" field

    description:
      'Yes, a Jedi’s strength flows from the Force. But beware of the dark side. Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny, consume you it will, as it did Obi-Wan’s apprentice.',

    priority: 'Medium',

    completed: false,
  },
];

const ContractsData = [
  {
    name: 'Pierre Simon de Laplace',

    amount: 90.44,

    body: 'Clear your mind must be, if you are to find the villains behind this plot.',

    // type code here for "relation_one" field

    signedDate: new Date('2023-12-03'),

    // type code here for "relation_one" field
  },

  {
    name: 'Galileo Galilei',

    amount: 19.24,

    body: 'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    // type code here for "relation_one" field

    signedDate: new Date('2023-09-10'),

    // type code here for "relation_one" field
  },

  {
    name: 'Theodosius Dobzhansky',

    amount: 91.39,

    body: 'Reckless he is. Matters are worse.',

    // type code here for "relation_one" field

    signedDate: new Date('2023-11-20'),

    // type code here for "relation_one" field
  },

  {
    name: 'Jean Piaget',

    amount: 70.26,

    body: 'Your weapons, you will not need them.',

    // type code here for "relation_one" field

    signedDate: new Date('2023-06-11'),

    // type code here for "relation_one" field
  },

  {
    name: 'Jean Baptiste Lamarck',

    amount: 19.79,

    body: 'Truly wonderful, the mind of a child is.',

    // type code here for "relation_one" field

    signedDate: new Date('2023-09-15'),

    // type code here for "relation_one" field
  },
];

const AmendmentsData = [
  {
    // type code here for "relation_one" field

    type: 'Discount',

    amount: 40.06,

    description: 'Truly wonderful, the mind of a child is.',
  },

  {
    // type code here for "relation_one" field

    type: 'Insurance Claim',

    amount: 30.51,

    description: 'Your weapons, you will not need them.',
  },

  {
    // type code here for "relation_one" field

    type: 'Insurance Claim',

    amount: 48.62,

    description: 'Feel the force!',
  },

  {
    // type code here for "relation_one" field

    type: 'Upgrade',

    amount: 58.67,

    description: 'That is why you fail.',
  },

  {
    // type code here for "relation_one" field

    type: 'Insurance Claim',

    amount: 21.56,

    description:
      'Always two there are, no more, no less. A master and an apprentice.',
  },
];

const MilestonesData = [
  {
    Name: 'Like a red-headed stepchild',
  },

  {
    Name: "I'm washing my hands of it",
  },

  {
    Name: 'I got that scurvy',
  },

  {
    Name: 'Might be DQ time',
  },

  {
    Name: 'I want my 5$ back',
  },
];

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

  const relatedImageid3 = await Images.findOne({
    offset: Math.floor(Math.random() * (await Images.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setImageid) {
    await User3.setImageid(relatedImageid3);
  }

  const relatedImageid4 = await Images.findOne({
    offset: Math.floor(Math.random() * (await Images.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setImageid) {
    await User4.setImageid(relatedImageid4);
  }
}

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

  const relatedAssigneduserid3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact3 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Contact3?.setAssigneduserid) {
    await Contact3.setAssigneduserid(relatedAssigneduserid3);
  }

  const relatedAssigneduserid4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact4 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Contact4?.setAssigneduserid) {
    await Contact4.setAssigneduserid(relatedAssigneduserid4);
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

  const relatedContactid3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Address3 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Address3?.setContactid) {
    await Address3.setContactid(relatedContactid3);
  }

  const relatedContactid4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Address4 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Address4?.setContactid) {
    await Address4.setContactid(relatedContactid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Address3 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Address3?.setJobid) {
    await Address3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Address4 = await Addresses.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Address4?.setJobid) {
    await Address4.setJobid(relatedJobid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate3 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Estimate3?.setJobid) {
    await Estimate3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate4 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Estimate4?.setJobid) {
    await Estimate4.setJobid(relatedJobid4);
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

  const relatedContactid3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Estimate3 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Estimate3?.setContactid) {
    await Estimate3.setContactid(relatedContactid3);
  }

  const relatedContactid4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Estimate4 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Estimate4?.setContactid) {
    await Estimate4.setContactid(relatedContactid4);
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

  const relatedTemplateid3 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const Estimate3 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Estimate3?.setTemplateid) {
    await Estimate3.setTemplateid(relatedTemplateid3);
  }

  const relatedTemplateid4 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const Estimate4 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Estimate4?.setTemplateid) {
    await Estimate4.setTemplateid(relatedTemplateid4);
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

  const relatedContactid3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Job3 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Job3?.setContactid) {
    await Job3.setContactid(relatedContactid3);
  }

  const relatedContactid4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Job4 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Job4?.setContactid) {
    await Job4.setContactid(relatedContactid4);
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

  const relatedOrderid3 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Job3 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Job3?.setOrderid) {
    await Job3.setOrderid(relatedOrderid3);
  }

  const relatedOrderid4 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Job4 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Job4?.setOrderid) {
    await Job4.setOrderid(relatedOrderid4);
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

  const relatedAssigneduserid3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job3 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Job3?.setAssigneduserid) {
    await Job3.setAssigneduserid(relatedAssigneduserid3);
  }

  const relatedAssigneduserid4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job4 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Job4?.setAssigneduserid) {
    await Job4.setAssigneduserid(relatedAssigneduserid4);
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

  const relatedTradeid3 = await Trades.findOne({
    offset: Math.floor(Math.random() * (await Trades.count())),
  });
  const Template3 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Template3?.setTradeid) {
    await Template3.setTradeid(relatedTradeid3);
  }

  const relatedTradeid4 = await Trades.findOne({
    offset: Math.floor(Math.random() * (await Trades.count())),
  });
  const Template4 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Template4?.setTradeid) {
    await Template4.setTradeid(relatedTradeid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setJobid) {
    await Invoice3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice4 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Invoice4?.setJobid) {
    await Invoice4.setJobid(relatedJobid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setJobid) {
    await Order3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Order4 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Order4?.setJobid) {
    await Order4.setJobid(relatedJobid4);
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

  const relatedEstimateid3 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setEstimateid) {
    await Order3.setEstimateid(relatedEstimateid3);
  }

  const relatedEstimateid4 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const Order4 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Order4?.setEstimateid) {
    await Order4.setEstimateid(relatedEstimateid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image3 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Image3?.setJobid) {
    await Image3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image4 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Image4?.setJobid) {
    await Image4.setJobid(relatedJobid4);
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

  const relatedUserid3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image3 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Image3?.setUserid) {
    await Image3.setUserid(relatedUserid3);
  }

  const relatedUserid4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image4 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Image4?.setUserid) {
    await Image4.setUserid(relatedUserid4);
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

  const relatedDocumentid3 = await Documents.findOne({
    offset: Math.floor(Math.random() * (await Documents.count())),
  });
  const Image3 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Image3?.setDocumentid) {
    await Image3.setDocumentid(relatedDocumentid3);
  }

  const relatedDocumentid4 = await Documents.findOne({
    offset: Math.floor(Math.random() * (await Documents.count())),
  });
  const Image4 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Image4?.setDocumentid) {
    await Image4.setDocumentid(relatedDocumentid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document3 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Document3?.setJobid) {
    await Document3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document4 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Document4?.setJobid) {
    await Document4.setJobid(relatedJobid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Email3 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Email3?.setJobid) {
    await Email3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Email4 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Email4?.setJobid) {
    await Email4.setJobid(relatedJobid4);
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

  const relatedUserid3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email3 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Email3?.setUserid) {
    await Email3.setUserid(relatedUserid3);
  }

  const relatedUserid4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email4 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Email4?.setUserid) {
    await Email4.setUserid(relatedUserid4);
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

  const relatedContactid3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Email3 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Email3?.setContactid) {
    await Email3.setContactid(relatedContactid3);
  }

  const relatedContactid4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Email4 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Email4?.setContactid) {
    await Email4.setContactid(relatedContactid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Chat3 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Chat3?.setJobid) {
    await Chat3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Chat4 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Chat4?.setJobid) {
    await Chat4.setJobid(relatedJobid4);
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

  const relatedSenderid3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat3 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Chat3?.setSenderid) {
    await Chat3.setSenderid(relatedSenderid3);
  }

  const relatedSenderid4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat4 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Chat4?.setSenderid) {
    await Chat4.setSenderid(relatedSenderid4);
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

  const relatedReceiverid3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat3 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Chat3?.setReceiverid) {
    await Chat3.setReceiverid(relatedReceiverid3);
  }

  const relatedReceiverid4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat4 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Chat4?.setReceiverid) {
    await Chat4.setReceiverid(relatedReceiverid4);
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

  const relatedAssigneduserid3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setAssigneduserid) {
    await Appointment3.setAssigneduserid(relatedAssigneduserid3);
  }

  const relatedAssigneduserid4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setAssigneduserid) {
    await Appointment4.setAssigneduserid(relatedAssigneduserid4);
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

  const relatedContactid3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setContactid) {
    await Appointment3.setContactid(relatedContactid3);
  }

  const relatedContactid4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setContactid) {
    await Appointment4.setContactid(relatedContactid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setJobid) {
    await Appointment3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setJobid) {
    await Appointment4.setJobid(relatedJobid4);
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

  const relatedAssignedtouserid3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task3 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Task3?.setAssignedtouserid) {
    await Task3.setAssignedtouserid(relatedAssignedtouserid3);
  }

  const relatedAssignedtouserid4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task4 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Task4?.setAssignedtouserid) {
    await Task4.setAssignedtouserid(relatedAssignedtouserid4);
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

  const relatedAppointmentid3 = await Appointments.findOne({
    offset: Math.floor(Math.random() * (await Appointments.count())),
  });
  const Task3 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Task3?.setAppointmentid) {
    await Task3.setAppointmentid(relatedAppointmentid3);
  }

  const relatedAppointmentid4 = await Appointments.findOne({
    offset: Math.floor(Math.random() * (await Appointments.count())),
  });
  const Task4 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Task4?.setAppointmentid) {
    await Task4.setAppointmentid(relatedAppointmentid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Task3 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Task3?.setJobid) {
    await Task3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Task4 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Task4?.setJobid) {
    await Task4.setJobid(relatedJobid4);
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

  const relatedContactid3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Contract3 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Contract3?.setContactid) {
    await Contract3.setContactid(relatedContactid3);
  }

  const relatedContactid4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Contract4 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Contract4?.setContactid) {
    await Contract4.setContactid(relatedContactid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Contract3 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Contract3?.setJobid) {
    await Contract3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Contract4 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Contract4?.setJobid) {
    await Contract4.setJobid(relatedJobid4);
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

  const relatedJobid3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Amendment3 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Amendment3?.setJobid) {
    await Amendment3.setJobid(relatedJobid3);
  }

  const relatedJobid4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Amendment4 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Amendment4?.setJobid) {
    await Amendment4.setJobid(relatedJobid4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Contacts.bulkCreate(ContactsData);

    await Addresses.bulkCreate(AddressesData);

    await Estimates.bulkCreate(EstimatesData);

    await Jobs.bulkCreate(JobsData);

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

    await Milestones.bulkCreate(MilestonesData);

    await Promise.all([
      await associateUserWithImageid(),

      await associateContactWithAssigneduserid(),

      await associateAddressWithContactid(),

      await associateAddressWithJobid(),

      await associateEstimateWithJobid(),

      await associateEstimateWithContactid(),

      await associateEstimateWithTemplateid(),

      await associateJobWithContactid(),

      await associateJobWithOrderid(),

      await associateJobWithAssigneduserid(),

      await associateTemplateWithTradeid(),

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

    await queryInterface.bulkDelete('estimates', null, {});

    await queryInterface.bulkDelete('jobs', null, {});

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

    await queryInterface.bulkDelete('milestones', null, {});
  },
};
