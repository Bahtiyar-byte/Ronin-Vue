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

const ContactsData = [
  {
    firstName: "How 'bout them Cowboys",

    lastName: "That Barbala couldn't fly his way out of a wet paper bag",

    email: 'beckie@runolfsson-mills.org',

    phone: '(966) 056-2766',

    company: 'Langosh LLC',

    status: 'Lead',

    source: 'Other',

    crossReference: 'That damn Bill Stull',

    // type code here for "relation_one" field
  },

  {
    firstName: 'So I was walking Oscar',

    lastName: 'Standby',

    email: 'cyril_bernhard@leuschke-oreilly.name',

    phone: '1-747-203-7088 x58635',

    company: 'Lemke, Haag and Koelpin',

    status: 'Prospect',

    source: 'Google Ads',

    crossReference: 'I want my 5$ back',

    // type code here for "relation_one" field
  },

  {
    firstName: 'Might be DQ time',

    lastName: 'Come on now',

    email: 'trevor.kihn@abbott-ferry.io',

    phone: '1-708-731-1757 x17615',

    company: 'Schimmel Inc',

    status: 'Prospect',

    source: 'Other',

    crossReference: 'That damn diabetes',

    // type code here for "relation_one" field
  },
];

const AddressesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'I tell you what',

    suite_apt_unit: 'That goddamn Datamate',

    city: 'Come on now',

    state: 'AK',

    zip: "That's messed up",

    country: "How 'bout them Cowboys",

    type: 'Location',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'I tell you what',

    suite_apt_unit: 'That damn Bill Stull',

    city: 'So I was walking Oscar',

    state: 'AR',

    zip: "C'mon Naomi",

    country: "It's around here somewhere",

    type: 'Mailing',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    street: 'I want my 5$ back',

    suite_apt_unit: 'Let me tell ya',

    city: 'So I was walking Oscar',

    state: 'AR',

    zip: 'Contact the tower',

    country: 'Yup',

    type: 'Mailing',
  },
];

const EstimatesData = [
  {
    description: 'Already know you that which you need.',

    additionalNotes:
      'Strong is Vader. Mind what you have learned. Save you it can.',

    price: 93.39,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description:
      'Much to learn you still have my old padawan. ... This is just the beginning!',

    additionalNotes:
      'Strong is Vader. Mind what you have learned. Save you it can.',

    price: 16.35,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    additionalNotes:
      'Once you start down the dark path, forever will it dominate your destiny, consume you it will.',

    price: 54.94,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const JobsData = [
  {
    Name: 'Reminds me of my old girlfriend Olga Goodntight',

    type: 'Inspection',

    category: 'Commercial ',

    status: 'Completed',

    startDate: new Date('2024-01-21'),

    endDate: new Date('2023-08-01'),

    description:
      'Do not assume anything Obi-Wan. Clear your mind must be if you are to discover the real villains behind this plot.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: 'That damn diabetes',

    type: 'Inspection',

    category: 'Residential',

    status: 'Completed',

    startDate: new Date('2023-10-24'),

    endDate: new Date('2023-11-30'),

    description: 'To answer power with power, the Jedi way this is',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    Name: 'Might be DQ time',

    type: 'Retail',

    category: 'Residential',

    status: 'Quoted',

    startDate: new Date('2024-05-18'),

    endDate: new Date('2023-08-06'),

    description: 'That is why you fail.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TemplatesData = [
  {
    name: 'Jean Baptiste Lamarck',

    description:
      'Always two there are, no more, no less. A master and an apprentice.',

    // type code here for "relation_one" field
  },

  {
    name: 'Arthur Eddington',

    description: 'You will find only what you bring in.',

    // type code here for "relation_one" field
  },

  {
    name: 'Charles Lyell',

    description: 'Reckless he is. Matters are worse.',

    // type code here for "relation_one" field
  },
];

const TradesData = [
  {
    Name: 'Painting',
  },

  {
    Name: 'Chimney Cap',
  },

  {
    Name: 'Service Repairs',
  },
];

const InvoicesData = [
  {
    invoiceNumber: 'I got that scurvy',

    invoiceDate: new Date('2023-06-30'),

    terms: 'Upon Receipt',

    approvedJobValue: 36.91,

    invoicedAmount: 36.49,

    balanceAmount: 51.19,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'Might be DQ time',

    invoiceDate: new Date('2023-11-27'),

    terms: 'Net 7 Days',

    approvedJobValue: 63.34,

    invoicedAmount: 24.83,

    balanceAmount: 78.16,

    // type code here for "relation_one" field
  },

  {
    invoiceNumber: 'Reminds me of my old girlfriend Olga Goodntight',

    invoiceDate: new Date('2023-08-13'),

    terms: 'Net 45 Days',

    approvedJobValue: 84.34,

    invoicedAmount: 54.26,

    balanceAmount: 14.71,

    // type code here for "relation_one" field
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: "That Barbala couldn't fly his way out of a wet paper bag",

    totalAmount: 60.94,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'Reminds me of my old girlfriend Olga Goodntight',

    totalAmount: 22.88,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    orderNumber: 'Always the last one to the party',

    totalAmount: 80.89,
  },
];

const ImagesData = [
  {
    name: 'Frederick Gowland Hopkins',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'William Bayliss',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Max Planck',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const DocumentsData = [
  {
    // type code here for "relation_one" field

    name: 'Claude Bernard',

    active: false,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'Frederick Gowland Hopkins',

    active: true,

    // type code here for "files" field
  },

  {
    // type code here for "relation_one" field

    name: 'Hans Bethe',

    active: true,

    // type code here for "files" field
  },
];

const EmailsData = [
  {
    // type code here for "relation_one" field

    toAddress: "That's messed up",

    fromAddress: "C'mon Naomi",

    isInbound: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Use your feelings, Obi-Wan, and find him you will.',

    body: 'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained. A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away - to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',
  },

  {
    // type code here for "relation_one" field

    toAddress: 'Reminds me of my old girlfriend Olga Goodntight',

    fromAddress: 'I want my 5$ back',

    isInbound: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject: 'Mudhole? Slimy? My home this is!',

    body: 'Difficult to see. Always in motion is the future...',
  },

  {
    // type code here for "relation_one" field

    toAddress: "I'm washing my hands of it",

    fromAddress: 'Yup',

    isInbound: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    subject:
      'Always two there are, no more, no less. A master and an apprentice.',

    body: 'Always pass on what you have learned.',
  },
];

const ChatsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message: 'You will find only what you bring in.',

    sentTime: new Date('2023-12-17'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message:
      'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    sentTime: new Date('2023-11-02'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    message: 'Already know you that which you need.',

    sentTime: new Date('2023-06-27'),
  },
];

const AppointmentsData = [
  {
    subject: 'Let me tell ya',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-11-26'),

    endTime: new Date('2023-10-18'),

    description:
      'Once you start down the dark path, forever will it dominate your destiny, consume you it will.',

    location: 'No one tells me shit',

    // type code here for "relation_one" field

    reminder: new Date('2023-07-27'),
  },

  {
    subject: 'I got that scurvy',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2024-04-20'),

    endTime: new Date('2023-08-23'),

    description:
      'Clear your mind must be, if you are to find the villains behind this plot.',

    location: 'I want my 5$ back',

    // type code here for "relation_one" field

    reminder: new Date('2024-02-11'),
  },

  {
    subject: 'Yup',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    startTime: new Date('2023-10-21'),

    endTime: new Date('2024-04-09'),

    description: 'To answer power with power, the Jedi way this is',

    location: "I'm washing my hands of it",

    // type code here for "relation_one" field

    reminder: new Date('2024-04-15'),
  },
];

const TasksData = [
  {
    subject: 'My boss gonna fire me',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2024-02-10'),

    // type code here for "relation_one" field

    description: 'Already know you that which you need.',

    priority: 'Low',

    completed: false,
  },

  {
    subject: 'Reminds me of my old girlfriend Olga Goodntight',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2024-05-24'),

    // type code here for "relation_one" field

    description: 'Always pass on what you have learned.',

    priority: 'High',

    completed: false,
  },

  {
    subject: 'Turd gone wrong',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    dueDateAndTime: new Date('2023-11-11'),

    // type code here for "relation_one" field

    description:
      'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    priority: 'High',

    completed: true,
  },
];

const ContractsData = [
  {
    name: 'Jean Baptiste Lamarck',

    amount: 14.24,

    body: 'Mudhole? Slimy? My home this is!',

    // type code here for "relation_one" field

    signedDate: new Date('2023-12-10'),

    // type code here for "relation_one" field
  },

  {
    name: 'Michael Faraday',

    amount: 86.04,

    body: 'Truly wonderful, the mind of a child is.',

    // type code here for "relation_one" field

    signedDate: new Date('2023-06-07'),

    // type code here for "relation_one" field
  },

  {
    name: 'Heike Kamerlingh Onnes',

    amount: 88.58,

    body: 'Adventure. Excitement. A Jedi craves not these things.',

    // type code here for "relation_one" field

    signedDate: new Date('2023-06-15'),

    // type code here for "relation_one" field
  },
];

const AmendmentsData = [
  {
    // type code here for "relation_one" field

    type: 'Change Order',

    amount: 58.01,

    description:
      'Yes, a Jedi’s strength flows from the Force. But beware of the dark side. Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny, consume you it will, as it did Obi-Wan’s apprentice.',
  },

  {
    // type code here for "relation_one" field

    type: 'Supplement',

    amount: 34.02,

    description: 'Always pass on what you have learned.',
  },

  {
    // type code here for "relation_one" field

    type: 'Upgrade',

    amount: 51.66,

    description: 'Mudhole? Slimy? My home this is!',
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
  },
};
