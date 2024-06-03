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
    firstName: 'No one tells me shit',

    lastName: 'I got that scurvy',

    email: 'bradford_steuber@deckow.biz',

    phone: '855-844-7618 x296',

    company: 'Keebler, Mertz and Ledner',

    status: 'Prospect',

    source: 'Google Ads',

    crossReference: 'Like a red-headed stepchild',

    // type code here for "relation_one" field
  },

  {
    firstName: "How 'bout them Cowboys",

    lastName: 'Let me tell ya',

    email: 'nicola@padberg.biz',

    phone: '(174) 430-2618',

    company: 'Berge and Sons',

    status: 'Lead',

    source: 'Facebook',

    crossReference: "Y'all never listen to me",

    // type code here for "relation_one" field
  },

  {
    firstName: 'Got depression, Smith and Wessen',

    lastName: 'Got depression, Smith and Wessen',

    email: 'louie@greenholt.io',

    phone: '185.345.4117 x7893',

    company: 'Hand, Baumbach and Raynor',

    status: 'Customer',

    source: 'Facebook',

    crossReference: 'Yup',

    // type code here for "relation_one" field
  },

  {
    firstName: 'Texas!',

    lastName: 'That damn Bill Stull',

    email: 'martina@pfannerstill.biz',

    phone: '917.611.8105 x974',

    company: 'Brekke Group',

    status: 'Lead',

    source: 'Website',

    crossReference: 'My buddy Harlen',

    // type code here for "relation_one" field
  },
];

const AddressesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'That damn gimble',

    suite_apt_unit: 'Reminds me of my old girlfriend Olga Goodntight',

    city: "How 'bout them Cowboys",

    state: 'AL',

    zip: "That Barbala couldn't fly his way out of a wet paper bag",

    country: "I'm washing my hands of it",

    type: 'Billing',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'That damn Bill Stull',

    suite_apt_unit: 'No one tells me shit',

    city: 'That goddamn Datamate',

    state: 'AL',

    zip: "That Barbala couldn't fly his way out of a wet paper bag",

    country: "It's around here somewhere",

    type: 'Billing',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: "Goin' hog huntin'",

    suite_apt_unit: 'My buddy Harlen',

    city: 'That damn gimble',

    state: 'AL',

    zip: 'I got that scurvy',

    country: "How 'bout them Cowboys",

    type: 'Billing',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'Standby',

    suite_apt_unit: 'Yup',

    city: 'Standby',

    state: 'CA',

    zip: "C'mon Naomi",

    country: "How 'bout them Cowboys",

    type: 'Billing',
  },
];

const EstimatesData = [
  {
    description: 'Younglings, younglings gather ’round.',

    additionalNotes:
      'Yes, a Jedi’s strength flows from the Force. But beware of the dark side. Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny, consume you it will, as it did Obi-Wan’s apprentice.',

    price: 75.68,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Reckless he is. Matters are worse.',

    additionalNotes:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    price: 34.76,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'That is why you fail.',

    additionalNotes:
      'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',

    price: 60.09,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description:
      'Strong is Vader. Mind what you have learned. Save you it can.',

    additionalNotes:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    price: 57.14,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const JobsData = [
  {
    Name: "That Barbala couldn't fly his way out of a wet paper bag",

    type: 'Service',

    category: 'Residential',

    status: 'Approved',

    startDate: new Date('2024-04-03'),

    endDate: new Date('2024-01-22'),

    description:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: "That Barbala couldn't fly his way out of a wet paper bag",

    type: 'Retail',

    category: 'Residential',

    status: 'Approved',

    startDate: new Date('2023-10-12'),

    endDate: new Date('2023-07-31'),

    description: 'Already know you that which you need.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: 'So I was walking Oscar',

    type: 'Warranty',

    category: 'Commercial ',

    status: 'Completed',

    startDate: new Date('2023-12-08'),

    endDate: new Date('2023-10-14'),

    description: 'Not if anything to say about it I have',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: 'Turd gone wrong',

    type: 'Inspection',

    category: 'Commercial ',

    status: 'Active',

    startDate: new Date('2023-07-16'),

    endDate: new Date('2024-04-16'),

    description: 'Around the survivors a perimeter create.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TemplatesData = [
  {
    name: 'Claude Levi-Strauss',

    description: 'Difficult to see. Always in motion is the future...',

    // type code here for "relation_one" field
  },

  {
    name: 'Anton van Leeuwenhoek',

    description:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    // type code here for "relation_one" field
  },

  {
    name: 'Robert Koch',

    description: 'Hmm. In the end, cowards are those who follow the dark side.',

    // type code here for "relation_one" field
  },

  {
    name: 'Marie Curie',

    description: 'Difficult to see. Always in motion is the future...',

    // type code here for "relation_one" field
  },
];

const TradesData = [
  {
    Name: 'Shingles',
  },

  {
    Name: 'Gutter Cleaning',
  },

  {
    Name: 'Gutter Guards',
  },

  {
    Name: 'Silicone',
  },
];

const InvoicesData = [
  {
    invoiceNumber: "That's messed up",

    invoiceDate: new Date('2024-02-25'),

    terms: 'Net 60 Days',

    approvedJobValue: 77.46,

    invoicedAmount: 42.95,

    balanceAmount: 27.27,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'That goddamn Datamate',

    invoiceDate: new Date('2023-09-06'),

    terms: 'Net 15 Days',

    approvedJobValue: 74.21,

    invoicedAmount: 38.37,

    balanceAmount: 47.97,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'I got that scurvy',

    invoiceDate: new Date('2023-06-25'),

    terms: 'Net 30 Days',

    approvedJobValue: 65.66,

    invoicedAmount: 46.91,

    balanceAmount: 68.17,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'No one tells me shit',

    invoiceDate: new Date('2023-11-26'),

    terms: 'Net 15 Days',

    approvedJobValue: 14.57,

    invoicedAmount: 29.21,

    balanceAmount: 17.42,

    // type code here for "relation_one" field
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'My boss gonna fire me',

    totalAmount: 33.09,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'No one tells me shit',

    totalAmount: 67.15,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'I want my 5$ back',

    totalAmount: 78.98,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'Got depression, Smith and Wessen',

    totalAmount: 86.55,
  },
];

const ImagesData = [
  {
    name: 'Leonard Euler',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'George Gaylord Simpson',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Trofim Lysenko',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Wilhelm Wundt',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const DocumentsData = [
  {
    // type code here for "relation_one" field

    name: 'William Harvey',

    active: true,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'Rudolf Virchow',

    active: true,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'Linus Pauling',

    active: false,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'Edward O. Wilson',

    active: false,

    // type code here for "files" field
  },
];

const EmailsData = [
  {
    // type code here for "relation_one" field

    toAddress: 'Contact the tower',

    fromAddress: 'That damn diabetes',

    isInbound: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Your weapons, you will not need them.',

    body: 'Once you start down the dark path, forever will it dominate your destiny, consume you it will.',
  },

  {
    // type code here for "relation_one" field

    toAddress: 'Reminds me of my old girlfriend Olga Goodntight',

    fromAddress: 'Reminds me of my old girlfriend Olga Goodntight',

    isInbound: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject:
      'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained. A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away - to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',

    body: 'Clear your mind must be, if you are to find the villains behind this plot.',
  },

  {
    // type code here for "relation_one" field

    toAddress: 'Like a red-headed stepchild',

    fromAddress: 'Like a red-headed stepchild',

    isInbound: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Use your feelings, Obi-Wan, and find him you will.',

    body: 'Always pass on what you have learned.',
  },

  {
    // type code here for "relation_one" field

    toAddress: "Y'all never listen to me",

    fromAddress: 'Like a red-headed stepchild',

    isInbound: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Truly wonderful, the mind of a child is.',

    body: 'At an end your rule is, and not short enough it was!',
  },
];

const ChatsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    sentTime: new Date('2024-05-06'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message: 'Truly wonderful, the mind of a child is.',

    sentTime: new Date('2023-07-12'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    sentTime: new Date('2023-07-05'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message:
      'Always two there are, no more, no less. A master and an apprentice.',

    sentTime: new Date('2023-08-14'),
  },
];

const AppointmentsData = [
  {
    subject: 'Reminds me of my old girlfriend Olga Goodntight',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-07-13'),

    endTime: new Date('2024-01-06'),

    description: 'Luminous beings are we - not this crude matter.',

    location: 'Yup',

    // type code here for "relation_one" field

    reminder: new Date('2024-01-10'),
  },

  {
    subject: 'Might be DQ time',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-11-11'),

    endTime: new Date('2023-07-20'),

    description: 'Truly wonderful, the mind of a child is.',

    location: 'No one tells me shit',

    // type code here for "relation_one" field

    reminder: new Date('2023-10-24'),
  },

  {
    subject: "It's around here somewhere",

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2024-05-04'),

    endTime: new Date('2023-11-04'),

    description:
      'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained. A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away - to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',

    location: 'That damn gimble',

    // type code here for "relation_one" field

    reminder: new Date('2023-12-17'),
  },

  {
    subject: 'I want my 5$ back',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-11-23'),

    endTime: new Date('2024-05-30'),

    description: 'Not if anything to say about it I have',

    location: 'Turd gone wrong',

    // type code here for "relation_one" field

    reminder: new Date('2024-01-03'),
  },
];

const TasksData = [
  {
    subject: 'I want my damn cart back',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2024-03-28'),

    // type code here for "relation_one" field

    description:
      'Once you start down the dark path, forever will it dominate your destiny, consume you it will.',

    priority: 'High',

    completed: false,
  },

  {
    subject: 'Texas!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2023-07-06'),

    // type code here for "relation_one" field

    description: 'Reckless he is. Matters are worse.',

    priority: 'Medium',

    completed: true,
  },

  {
    subject: 'Like a red-headed stepchild',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2023-11-23'),

    // type code here for "relation_one" field

    description:
      'Always two there are, no more, no less. A master and an apprentice.',

    priority: 'Medium',

    completed: true,
  },

  {
    subject: 'My buddy Harlen',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2023-12-29'),

    // type code here for "relation_one" field

    description:
      'Do not assume anything Obi-Wan. Clear your mind must be if you are to discover the real villains behind this plot.',

    priority: 'High',

    completed: true,
  },
];

const ContractsData = [
  {
    name: 'Euclid',

    amount: 77.04,

    body: 'Your weapons, you will not need them.',

    // type code here for "relation_one" field

    signedDate: new Date('2024-02-17'),

    // type code here for "relation_one" field
  },

  {
    name: 'Max Delbruck',

    amount: 13.62,

    body: 'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    // type code here for "relation_one" field

    signedDate: new Date('2024-03-04'),

    // type code here for "relation_one" field
  },

  {
    name: 'Michael Faraday',

    amount: 38.03,

    body: 'To answer power with power, the Jedi way this is',

    // type code here for "relation_one" field

    signedDate: new Date('2023-08-07'),

    // type code here for "relation_one" field
  },

  {
    name: 'Alfred Wegener',

    amount: 42.74,

    body: 'Always pass on what you have learned.',

    // type code here for "relation_one" field

    signedDate: new Date('2023-12-28'),

    // type code here for "relation_one" field
  },
];

const AmendmentsData = [
  {
    // type code here for "relation_one" field

    type: 'Upgrade',

    amount: 25.87,

    description: 'Around the survivors a perimeter create.',
  },

  {
    // type code here for "relation_one" field

    type: 'Supplement',

    amount: 73.41,

    description: 'Younglings, younglings gather ’round.',
  },

  {
    // type code here for "relation_one" field

    type: 'Supplement',

    amount: 23.18,

    description: 'Ow, ow, OW! On my ear you are!',
  },

  {
    // type code here for "relation_one" field

    type: 'Discount',

    amount: 27.57,

    description: 'Hmm. In the end, cowards are those who follow the dark side.',
  },
];

const MilestonesData = [
  {
    Name: "Goin' hog huntin'",
  },

  {
    Name: 'Like a red-headed stepchild',
  },

  {
    Name: 'That damn gimble',
  },

  {
    Name: 'Might be DQ time',
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
