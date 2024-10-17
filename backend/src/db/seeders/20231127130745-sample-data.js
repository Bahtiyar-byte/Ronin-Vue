const db = require('../models');
const Users = db.users;

const Contacts = db.contacts;

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

const EstimateSections = db.estimate_sections;

const templatesRelated_tradeTrades = db.templatesRelated_tradeTrades;

const ContactsData = [
  {
    name: 'John Roberts',

    email: 'rolando@padberg.biz',

    phone: '562-799-0324 x451',

    address: '38261 Korey Harbor, New Odell, MT 49043-7163',

    status: 'Prospect',

    firstName: 'John',

    lastName: 'Roberts',

    source: 'Google Ads',
  },

  {
    name: 'Mike Davidson',

    email: 'charlie.terry@satterfield-lemke.io',

    phone: '(409) 832-3398 x3831',

    address: '63571 Sharyl Walk, Port Ahmedville, RI 28680-2529',

    status: 'Prospect',

    firstName: "Mike",

    lastName: 'Davidson',

    source: 'Google Ads',
  },

  {
    name: 'Ryan Pike',

    email: 'catalina_armstrong@dickens.info',

    phone: '642.725.1654 x664',

    address: '8656 Kohler Islands, North Maryrose, PA 50935',

    status: 'Customer',

    firstName: 'Ryan',

    lastName: "Pike",

    source: 'Google Ads',
  },

  {
    name: 'Kevin Smith',

    email: 'edith@welch-wilkinson.com',

    phone: '(976) 462-9103 x326',

    address: 'Apt. 454 1533 Kozey Mission, Terenceville, AR 97671-4911',

    status: 'Lead',

    firstName: 'Kevin',

    lastName: "Smith",

    source: 'Other',
  },

  {
    name: 'Hudo Lopez',

    email: 'lela@dickinson.info',

    phone: '977.098.6434 x659',

    address: 'Suite 145 943 Denesik Mill, West Manuelview, MO 53185',

    status: 'Prospect',

    firstName: 'Hudo',

    lastName: 'Lopez',

    source: 'Google Ads',
  },
];

const EstimatesData = [
  {
    name: '1-Downspouts-Flat Roofing',

    description:
      '1-Downspouts-Flat Roofing',

    trade: "1-Downspouts-Flat Roofing",

    template_used: "Y'all never listen to me",

    material_cost: 20.84,

    labor_cost: 78.64,

    markup: 16.05,

    profit_margin: 98.35,

    total_price: 28.61,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'Sent',
  },

  {
    name: '2-Downspouts',

    description: '2-Downspouts',

    trade: 'Downspouts',

    template_used: 'I want my damn cart back',

    material_cost: 10.82,

    labor_cost: 13.41,

    markup: 81.86,

    profit_margin: 13.35,

    total_price: 97.77,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'New',
  },

  {
    name: '3-Gutters',

    description:
      'Gutters',

    trade: "Gutters",

    template_used: 'So I was walking Oscar',

    material_cost: 56.88,

    labor_cost: 42.22,

    markup: 53.47,

    profit_margin: 41.84,

    total_price: 92.61,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'Approved',
  },

  {
    name: '4-Box Gutters',

    description: 'Box Gutters',

    trade: 'Box Gutters',

    template_used: 'Let me tell ya',

    material_cost: 50.69,

    labor_cost: 90.75,

    markup: 96.68,

    profit_margin: 31.18,

    total_price: 21.89,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'New',
  },

  {
    name: '5-Flat Roof',

    description:
      'Flat Roof',

    trade: "Flat Roof",

    template_used: 'That damn diabetes',

    material_cost: 80.09,

    labor_cost: 79.79,

    markup: 32.67,

    profit_margin: 25.63,

    total_price: 68.13,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'New',
  },
];

const JobsData = [
  {
    name: '24-0001: John Roberts',

    description: 'Fixing Roofings',

    category: 'Commercial',

    type: 'Inspection',

    status: 'Quoted',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "images" field

    // type code here for "files" field

    address: 'Apt. 170 4000 King Garden, Ahmadmouth, OR 14195-0373',

    start_date: new Date('2024-10-10'),

    end_date: new Date('2024-10-15'),
  },

  {
    name: '24-0002: Ryan Smith',

    description: 'Replacing new downspouts',

    category: 'Residential',

    type: 'Service',

    status: 'Completed',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "images" field

    // type code here for "files" field

    address: 'Apt. 833 784 Janell Squares, Wernerfort, AR 36907-4065',

    start_date: new Date('2024-10-12'),

    end_date: new Date('2024-10-16'),
  },

  {
    name: '24-0003: Jean Piaget',

    description: 'Fix new gutters',

    category: 'Residential',

    type: 'Service',

    status: 'Completed',

    address: '56743 Waters Corner, Port Ignaciochester, OR 99538-4219',

    start_date: new Date('2024-10-21'),

    end_date: new Date('2024-10-25'),
  },

  {
    name: '24-0004: Charles Davin',

    description:
      'Always two there are, no more, no less. A master and an apprentice.',

    category: 'Residential',

    type: 'Retail',

    status: 'Completed',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "images" field

    // type code here for "files" field

    address: '65523 McGlynn Roads, Hilllton, FL 61059',

    start_date: new Date('2024-10-22'),

    end_date: new Date('2024-10-26'),
  },

  {
    name: '24-0005: Jean Powel',

    description: 'Replace new Roofings',

    category: 'PropertyManagement',

    type: 'Retail',

    status: 'Quoted',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "images" field

    // type code here for "files" field

    address: '717 Sherwood Lane, Port Zacharychester, GA 03297',

    start_date: new Date('2024-10-22'),

    end_date: new Date('2024-10-24'),
  },
];

const TradesData = [
  {
    name: 'Aluminum/ Flashing',
  },
  {
    name: 'Box Gutters',
  },
  {
    name: 'Downspouts',
  },
  {
    name: 'EPDM',
  },
  {
    name: 'Flat Roof',
  },
  {
    name: 'Gutter Guards',
  },
  {
    name: 'Gutters',
  },
  {
    name: 'Metal',
  },
  {
    name: 'Service Repairs',
  },
  {
    name: 'Shingles',
  },
  {
    name: 'Siding',
  },
  {
    name: 'Silicone',
  },
  {
    name: 'Slate',
  },
  {
    name: 'Tile',
  },
  {
    name: 'TPO',
  },
  {
    name: 'Ventilation',
  },
];

const TemplatesData = [
  {
    name: 'Aluminum/ Flashing',
    description: 'Aluminum/ Flashing',
  },

  {
    name: 'Box Gutter Service- Mule Hide',
    description: 'Install new Mule-Hide silicone patch to necessary seams, cracks, holes and eave tubes in gutter system.\n' +
        'Install new Mule-Hide silicone rubber system to entire box gutter system.\n' +
        '\n' +
        'Warranty: Labor comes with 15-year warranty.\n' +
        'Mule-Hide silicone system comes with 50-year manufacturer\'s warranty.\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Downspouts',
    description: 'Downspouts',
  },

  {
    name: 'Flat Roofing',
    description: 'Flat Roofing',
  },

  {
    name: '5" Gutters',
    description: '- We will remove and dispose of the existing gutters and downspouts.\n' +
        '- New 5" aluminum seamless gutters will be installed.  Color selection to be picked out by homeowner.\n' +
        '- Install new 2x3 downspouts.\n' +
        '\n' +
        'Warranty: Labor comes with 15-year labor warranty.\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*\n',
  },

  {
    name: '6" Gutters',
    description: '- We will remove and dispose of the existing gutters and downspouts.\n' +
        '- New 6" aluminum seamless gutters will be installed.  Color selection to be picked out by homeowner.\n' +
        '- Install new downspouts.\n' +
        '\n' +
        'Warranty: Labor comes with 15-year warranty.\n' +
        'Gutters come with manufacturer\'s lifetime warranty.\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*\n',
  },

  {
    name: 'Box Gutter Service: Gaco',
    description: 'Install new Gaco silicone patch to necessary seams, cracks, holes and eave tubes in gutter system.\n' +
        'Install new Gaco silicone rubber system to entire box gutter system.\n' +
        '\n' +
        'Warranty: Labor comes with 15-year warranty.\n' +
        'Gaco silicone system comes with 50-year manufacturer\'s warranty.\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Inspection Report',
    description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',
  },

  {
    name: 'Shur Flo Gutter Guards 5"',
    description: 'Install new aluminum Shur Flo gutter guard system. Zip screw gutter guards to the existing gutters.\n' +
        '\n' +
        'Warranty: Labor comes with 15-year labor warranty.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Shur Flo Gutter Guards 6"',
    description: 'Install new aluminum Shur Flo gutter guard system. Zip screw gutter guards to the existing gutters.\n' +
        '\n' +
        'Warranty: Labor comes with 15-year labor warranty.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Metal Roofing',
    description: 'Remove existing layer of roof down to roof deck.\n' +
        'Removal of any additional layers will be an additional cost of $75 per square. Tighten down any loose decking using eight-penny nails. Any bad lumber will be replaced at an additional $5.50/linear foot or $75 per 7/16 sheet OSB.\n' +
        'Install new synthetic underlayment on entire deck.\n' +
        'Install all custom-made starter strip on all eaves.\n' +
        'Install new standing seam 26-gauge steel H-loc Central States metal roofing on entire roof.\n' +
        'Install all proper flashings to accommodate metal roofing.\n' +
        'Install custom-made ridge caps with all proper Z closures.\n' +
        '\n' +
        'Warranty: Metal roof comes with 15-year labor warranty, 40-year no-rust warranty, and 40-year paint warranty\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },
  {
    name: 'EPDM Roof',
    description: 'Remove existing roof down to roof deck.\n' +
        'Install new half-inch fiber insulation board to entire roof.\n' +
        'Install new EPDM 0.60 mil glue-down system rubber roof.\n' +
        'Install new EPDM flashing system to all pipes, curbs, and parapets where applicable.\n' +
        'Clean up and haul away all debris.\n' +
        '\n' +
        '\n' +
        '-Labor comes with 10-year warranty. \n' +
        '-EPDM roof system comes with 20-year warranty.\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Gaco',
    description: 'Install new Gaco silicone patch to necessary seams, drains, pipes, and extrusions on entire roof. \n' +
        'Install new Gaco silicone roof system to entire roof.\n' +
        'Clean up and haul away all debris.\n' +
        '\n' +
        'Warranty: Labor comes with 15-year warranty. Gaco comes with 50-year manufacturer\'s warranty.\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'GAF Timberline HDZ- ABC',
    description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square.\n' +
        'Tighten down any loose decking using eight-penny nails.  Any bad lumber will be replaced at an additional $5.50/linear foot OR $75 per 7/16 sheet OSB.\n' +
        'Install new GAF ice and water shield three feet up from bottom of all roof eaves and in all valleys.\n' +
        'Install new pipe vent covers to all pipe vents.\n' +
        'Install new GAF synthetic deck shield to entire roof deck.\n' +
        'Install new aluminum drip edge on all rake edges.\n' +
        'Install new GAF Timberline HDZ lifetime dimensional shingles to entire roof deck.\n' +
        'Install new aluminum step and counter flash system to all chimneys, dormers, and walls where applicable.\n' +
        'Install new GAF ridge vent system across peak of roof, or if length of ridge is not sufficient, install new box vents as needed to ensure proper ventilation.\n' +
        'Clean up and haul away all debris.\n' +
        '\n' +
        'Shingle Color:\n' +
        '\n' +
        'Warranty:\n' +
        'GAF shingles and labor come with manufacturer\'s lifetime warranty (50 years)\n' +
        'Labor covered by Evans Roofing and Gutters 15-year warranty\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        'Payment due upon completion.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Service Repairs',
    description: 'Service Repairs',
  },

  {
    name: 'Slate Service Call',
    description: 'Service slate roof by replacing any missing or damaged slate.\n' +
        'Slate will be replaced at an additional $50/piece.\n' +
        '\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Brad GAF Template',
    description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square.\n' +
        'Tighten down any loose decking using eight-penny nails.  Any bad lumber will be replaced at an additional $5.50/linear foot OR $75 per 7/16 sheet OSB.\n' +
        'Install new GAF ice and water shield three feet up from bottom of all roof eaves and in all valleys.\n' +
        'Install new pipe vent covers to all pipe vents.\n' +
        'Install new GAF synthetic deck shield to entire roof deck.\n' +
        'Install new aluminum drip edge on all rake edges.\n' +
        'Install new GAF Timberline HDZ lifetime dimensional shingles to entire roof deck.\n' +
        'Install new aluminum step and counter flash system to all chimneys, dormers, and walls where applicable.\n' +
        'Install new GAF ridge vent system across peak of roof, or if length of ridge is not sufficient, install new box vents as needed to ensure proper ventilation.\n' +
        'Clean up and haul away all debris.\n' +
        '\n' +
        'Shingle Color:\n' +
        '\n' +
        'Warranty:\n' +
        'GAF shingles and labor come with manufacturer\'s lifetime warranty (50 years)\n' +
        'Labor covered by GAF 10-year warranty. Additional 5 years by Evans Roofing and Gutters.\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        'Payment due upon completion.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'GAF Roof or Owens Corning',
    description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square.\n' +
        'Tighten down any loose decking using eight-penny nails. Any bad lumber will be replaced at an additional $5.50/linear foot or $75 per 7/16 sheet OSB.\n' +
        'Install new GAF or Owens Corning ice and water shield three feet up from bottom of all roof eaves and in all valleys. Install new pipe vent covers to all pipe vents.\n' +
        'Install new GAF or Owens Corning synthetic deck shield to entire roof deck.\n' +
        'Install new aluminum drip edge on all rake edges.\n' +
        'Install new GAF or Owens Corning dimensional shingles to entire roof deck.\n' +
        'Install new aluminum step and counter flash system to all chimneys, dormers, and walls where applicable.\n' +
        'Install new GAF or Owens Corning ridge vent system across peak of roof as needed, or if length of ridge is not sufficient, install new box vents as needed to ensure proper ventilation.  Check the roof overhang’s at the eaves for proper intake ventilation and install Adequate intake vents to ensure warranty \n' +
        'Clean up and haul away all debris.\n' +
        '\n' +
        'Shingle Color:\n' +
        '\n' +
        'Warranty: GAF and Owens Corning shingles and labor come with lifetime manufacturer\'s warranty.Labor covered by Evans Roofing and Gutters is a  15-year warranty.\n' +
        '\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        'Payment due upon completion.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Owens Corning',
    description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square. \n' +
        'Tighten down any loose decking using eight-penny nails. Any bad lumber will be replaced at an additional $5.50/linear foot or $75 per 7/16 sheet OSB. \n' +
        'Install new Owens Corning ice and water shield three feet up from bottom of all roof eaves. \n' +
        'Install new pipe vent covers to all pipe vents. \n' +
        'Install new Owens Corning synthetic deck shield to entire roof deck. \n' +
        'Install new aluminum drip edge on all rake edges. \n' +
        'Install new Owens Corning dimensional shingles to entire roof deck. \n' +
        'Install new aluminum step and counter flash system to all chimneys, dormers, and walls where applicable. \n' +
        'Install new Owens Corning ridge vent system across peak of roof as needed, or if length of ridge is not sufficient, install new box vents as needed to ensure proper ventilation. \n' +
        'Clean up and haul away all debris.\n' +
        '\n' +
        'Warranty: Owens Corning shingles and labor come with lifetime manufacturer\'s warranty.\n' +
        'Labor covered by Evans Roofing and Gutters is a  15-year warranty.\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        'Payment due upon completion.\n' +
        '\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Siding Template',
    description: 'Siding',
  },
  {
    name: 'Henry Silicone',
    description: 'Install new Henry silicone patch to necessary seams, drains, pipes, and extrusions on entire roof. \n' +
        'Install new Henry silicone roof system to entire roof.\n' +
        'Clean up and haul away all debris.\n' +
        '\n' +
        'Warranty: Labor comes with 15-year warranty. Henry comes with 50-year manufacturer\'s warranty.\n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },
  {
    name: 'Mule Hide',
    description: 'Install new Mule-Hide silicone patch to necessary seams, drains, pipes, and extrusions on entire roof.\n' +
        'Install new Mule-Hide silicone roof system to entire roof.\n' +
        'Clean up and haul away all debris.\n' +
        '\n' +
        '\n' +
        '*Labor comes with 15-year warranty.\n' +
        'Mule-Hide comes with 50-year manufacturer\'s warranty.* \n' +
        'Warranties are effective the day of job completion and full payment is received.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Service Repairs: Tile Roof',
    description: 'Service tile roof by replacing any missing or damaged slate.\n' +
        'Tile will be replaced at an additional $50/piece.\n' +
        '\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'TPO',
    description: 'GAF TPO RE-COVER\n' +
        '• REMOVE ALL WALL FLASHINGS, TERMINATION BAR, PIPE FLASHINGS TO PREP FOR NEW ROOFING SYSTEM.\n' +
        '• REMOVE LAST APPIED ROOFING SYSTEM LEAVING THE ORIGINAL IN TACT.\n' +
        '• ALL PERIMETER METAL SNAP ON FASCIA WILL BE REMOVED AND RE ASSEMBLED WHEN ROOFING PROJECT IS\n' +
        'COMPLETED.\n' +
        '• INSTALL ONE LAYER OF 1” ISO INSULATION WILL BE FULLY ADHERED TO THE EXISTING ROOF USING 3M CR-20 LOW RISE FOAM ADHESIVE.\n' +
        '• 3M WILL PERFORM A PRE-CONSTRUCTION PULL TEST TO ENSURE FULL ADHESION BEFORE ROOF COMMENCE.\n' +
        '• WE WILL THEN FULLY ADHERE NEW GAF TPO TO INSULATION USING MANUFACTURER’S BONDING ADHESIVE. \n' +
        '•  ALL FIELD SEAMS WILL BE HEAT WELDED USING A LIESTER ROBOT WELDER.\n' +
        '• USE GAF PRE-FABRICATED FLASHINGS FOR ALL PENETRATIONS, PIPES, AND PROTRUSIONS ON ROOF.\n' +
        ' • ALL PITCH PANS WILL BE FILLED WITH POURABLE SEALANT.\n' +
        '• INSTALL TERMINATION BAR AND COUNTER FLASHING TO FASTENED ALL VERTICAL WALL FLASHINGS.\n' +
        '• INSTALL NEW VERTICAL WALL SCUPPER DRAIN TO ALL DRAINS THAT ARE NOT SALVAGABLE AND DETERIORATED.\n' +
        '• NEW TPO SLIP SHEETS WILL BE INSTALLED UNDER ALL HVAC UNITS.\n' +
        '  • ALL TPO ACCESSORIES WILL BE INSTALLED WHERE AS NEEDED AND AS PER MANUFACTURER SPECIFICATIONS.\n' +
        '• CAULK AND SEAL TO PROVIDE WATER TIGHT SYSTEM.\n' +
        '• HVAC UNITS TO BE DISSCONNECTED BY OTHERS IF NEEDED TO PROPERLY INSTALL NEW ROOFING SYSTEM.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },

  {
    name: 'Ventilation',
    description: 'Install Lomanco Deck-Air ventilation at the eaves. (     )\n' +
        'The Deck-Air®, when properly installed with proper exhaust vents, provides a balanced ventilation system to rid your attic space of trapped heat and moisture.\n' +
        'The DA-4 is an excellent solution for roofs with little or no overhang for the installation of traditional intake vents.\n' +
        '\n' +
        '* Any Permit fees to be paid by homeowner.\n' +
        'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
  },
];

const InvoicesData = [
  {
    invoice_number: '24-0001',

    invoice_date: new Date('2023-10-19'),

    terms: 'Net 10 Days',

    approved_job_value: 53.59,

    balance_amount: 16.03,

    // type code here for "relation_one" field
  },

  {
    invoice_number: "24-0002",

    invoice_date: new Date('2023-10-11'),

    terms: 'Net 10 Days',

    approved_job_value: 34.39,

    balance_amount: 24.21,

    // type code here for "relation_one" field
  },

  {
    invoice_number: '24-0003',

    invoice_date: new Date('2024-10-14'),

    terms: 'By Due Date',

    approved_job_value: 93.17,

    balance_amount: 42.22,

    // type code here for "relation_one" field
  },

  {
    invoice_number: "24-0004",

    invoice_date: new Date('2024-10-13'),

    terms: 'Net 10 Days',

    approved_job_value: 26.99,

    balance_amount: 68.07,

    // type code here for "relation_one" field
  },

  {
    invoice_number: '24-0005',

    invoice_date: new Date('2024-10-15'),

    terms: 'Net 10 Days',

    approved_job_value: 59.94,

    balance_amount: 57.29,

    // type code here for "relation_one" field
  },
];

const OrdersData = [
  {
    order_name: 'Gutters Order',
    order_po_number: '24-0001: Mike Nigel',
    order_number: '24-0001',

    total_amount: 55.23,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    order_name: 'Box Gutters Order',
    order_po_number: '24-0002: Kevin Wayne',
    order_number: '24-0002',

    total_amount: 93.87,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    order_name: 'Metal Order',
    order_po_number: '24-0003: Levi Patrick',
    order_number: '24-0003',

    total_amount: 62.24,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    order_name: 'Gutter Cleaning Order',
    order_po_number: '24-0004: Adam Gordish',
    order_number: '24-0004',

    total_amount: 65.53,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    order_name: 'Gutter Cleaning Order',
    order_po_number: '24-0005: Gareth Boyd',
    order_number: '24-0005',


    total_amount: 98.16,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ImagesData = [
  {
    // type code here for "images" field

    Name: 'So I was walking Oscar',

    // type code here for "relation_one" field
  },

  {
    // type code here for "images" field

    Name: 'Got depression, Smith and Wessen',

    // type code here for "relation_one" field
  },

  {
    // type code here for "images" field

    Name: "It's around here somewhere",

    // type code here for "relation_one" field
  },

  {
    // type code here for "images" field

    Name: 'Got depression, Smith and Wessen',

    // type code here for "relation_one" field
  },

  {
    // type code here for "images" field

    Name: "That's messed up",

    // type code here for "relation_one" field
  },
];

const DocumentsData = [
  {
    name: 'Sigmund Freud',

    // type code here for "relation_one" field
  },

  {
    name: 'Murray Gell-Mann',

    // type code here for "relation_one" field
  },

  {
    name: 'Leonard Euler',

    // type code here for "relation_one" field
  },

  {
    name: 'Marie Curie',

    // type code here for "relation_one" field
  },

  {
    name: 'Comte de Buffon',

    // type code here for "relation_one" field
  },
];

const EmailsData = [
  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },
];

const ChatsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    name: 'Arthur Eddington',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    name: 'Comte de Buffon',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    name: 'Erwin Schrodinger',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    name: 'Albrecht von Haller',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_many" field

    name: 'George Gaylord Simpson',
  },
];

const AppointmentsData = [
  {
    subject: 'Come on now',

    start_time: new Date('2023-09-17'),

    end_time: new Date('2024-04-26'),

    notes: 'The dark side clouds everything. Impossible to see the future is.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    subject: 'Reminds me of my old girlfriend Olga Goodntight',

    start_time: new Date('2024-04-13'),

    end_time: new Date('2024-03-04'),

    notes: 'Younglings, younglings gather ’round.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    subject: 'That damn Bill Stull',

    start_time: new Date('2023-10-14'),

    end_time: new Date('2023-08-07'),

    notes: 'Hmm. In the end, cowards are those who follow the dark side.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    subject: 'Standby',

    start_time: new Date('2024-03-27'),

    end_time: new Date('2024-04-10'),

    notes: 'Feel the force!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    subject: 'That damn gimble',

    start_time: new Date('2023-10-03'),

    end_time: new Date('2023-07-25'),

    notes: 'Hmm. In the end, cowards are those who follow the dark side.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TasksData = [
  {
    subject: 'I want my damn cart back',

    // type code here for "relation_one" field

    status: 'Accepted',

    priority: 'High',

    due_date: new Date('2024-03-16'),

    // type code here for "relation_one" field
  },

  {
    subject: 'Might be DQ time',

    // type code here for "relation_one" field

    status: 'Accepted',

    priority: 'Medium',

    due_date: new Date('2024-03-02'),

    // type code here for "relation_one" field
  },

  {
    subject: "That's messed up",

    // type code here for "relation_one" field

    status: 'Open',

    priority: 'Low',

    due_date: new Date('2024-01-12'),

    // type code here for "relation_one" field
  },

  {
    subject: 'That damn diabetes',

    // type code here for "relation_one" field

    status: 'Open',

    priority: 'High',

    due_date: new Date('2023-08-11'),

    // type code here for "relation_one" field
  },

  {
    subject: "How 'bout them Cowboys",

    // type code here for "relation_one" field

    status: 'Accepted',

    priority: 'High',

    due_date: new Date('2024-01-13'),

    // type code here for "relation_one" field
  },
];

const ContractsData = [
  {
    name: 'B. F. Skinner',

    amount: 42.34,

    body: 'Do. Or do not. There is no try.',

    // type code here for "relation_one" field

    signed_date: new Date('2023-09-25'),

    // type code here for "relation_one" field
  },

  {
    name: 'Edward O. Wilson',

    amount: 76.18,

    body: 'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    // type code here for "relation_one" field

    signed_date: new Date('2024-04-03'),

    // type code here for "relation_one" field
  },

  {
    name: 'Willard Libby',

    amount: 83.25,

    body: 'Strong is Vader. Mind what you have learned. Save you it can.',

    // type code here for "relation_one" field

    signed_date: new Date('2023-08-06'),

    // type code here for "relation_one" field
  },

  {
    name: 'Claude Bernard',

    amount: 86.07,

    body: 'Ow, ow, OW! On my ear you are!',

    // type code here for "relation_one" field

    signed_date: new Date('2024-01-08'),

    // type code here for "relation_one" field
  },

  {
    name: 'Louis Pasteur',

    amount: 54.83,

    body: 'Do not assume anything Obi-Wan. Clear your mind must be if you are to discover the real villains behind this plot.',

    // type code here for "relation_one" field

    signed_date: new Date('2024-03-25'),

    // type code here for "relation_one" field
  },
];

const AmendmentsData = [
  {
    // type code here for "relation_one" field

    type: 'Upgrade',

    amount: 35.46,

    description: 'Already know you that which you need.',
  },

  {
    // type code here for "relation_one" field

    type: 'Discount',

    amount: 15.26,

    description: 'Hmm. In the end, cowards are those who follow the dark side.',
  },

  {
    // type code here for "relation_one" field

    type: 'Upgrade',

    amount: 75.48,

    description:
      'Strong is Vader. Mind what you have learned. Save you it can.',
  },

  {
    // type code here for "relation_one" field

    type: 'Upgrade',

    amount: 93.67,

    description: 'Ow, ow, OW! On my ear you are!',
  },

  {
    // type code here for "relation_one" field

    type: 'Insurance Claim',

    amount: 30.39,

    description:
      'Do not assume anything Obi-Wan. Clear your mind must be if you are to discover the real villains behind this plot.',
  },
];

const EstimateSectionsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    amount: 17.09,

    material_price: 76.25,

    labor_price: 40.56,

    name: 'Louis Pasteur',

    description: 'Hmm. In the end, cowards are those who follow the dark side.',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    amount: 78.61,

    material_price: 67.82,

    labor_price: 28.99,

    name: 'Edward Teller',

    description: 'To answer power with power, the Jedi way this is',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    amount: 67.77,

    material_price: 26.13,

    labor_price: 76.03,

    name: 'Heike Kamerlingh Onnes',

    description: 'Truly wonderful, the mind of a child is.',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    amount: 90.45,

    material_price: 76.04,

    labor_price: 44.68,

    name: 'Wilhelm Wundt',

    description: 'Difficult to see. Always in motion is the future...',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    amount: 11.99,

    material_price: 60.99,

    labor_price: 31.11,

    name: 'Paul Ehrlich',

    description: 'That is why you fail.',
  },
];

// Similar logic for "relation_many"

async function associateEstimateWithRelated_contact() {
  const relatedRelated_contact0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setRelated_contact) {
    await Estimate0.setRelated_contact(relatedRelated_contact0);
  }

  const relatedRelated_contact1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setRelated_contact) {
    await Estimate1.setRelated_contact(relatedRelated_contact1);
  }

  const relatedRelated_contact2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setRelated_contact) {
    await Estimate2.setRelated_contact(relatedRelated_contact2);
  }

  const relatedRelated_contact3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Estimate3 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Estimate3?.setRelated_contact) {
    await Estimate3.setRelated_contact(relatedRelated_contact3);
  }

  const relatedRelated_contact4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Estimate4 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Estimate4?.setRelated_contact) {
    await Estimate4.setRelated_contact(relatedRelated_contact4);
  }
}

async function associateEstimateWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setRelated_job) {
    await Estimate0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setRelated_job) {
    await Estimate1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setRelated_job) {
    await Estimate2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate3 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Estimate3?.setRelated_job) {
    await Estimate3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate4 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Estimate4?.setRelated_job) {
    await Estimate4.setRelated_job(relatedRelated_job4);
  }
}

async function associateJobWithAssigned_to() {
  const relatedAssigned_to0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job0 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Job0?.setAssigned_to) {
    await Job0.setAssigned_to(relatedAssigned_to0);
  }

  const relatedAssigned_to1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job1 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Job1?.setAssigned_to) {
    await Job1.setAssigned_to(relatedAssigned_to1);
  }

  const relatedAssigned_to2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job2 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Job2?.setAssigned_to) {
    await Job2.setAssigned_to(relatedAssigned_to2);
  }

  const relatedAssigned_to3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job3 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Job3?.setAssigned_to) {
    await Job3.setAssigned_to(relatedAssigned_to3);
  }

  const relatedAssigned_to4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Job4 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Job4?.setAssigned_to) {
    await Job4.setAssigned_to(relatedAssigned_to4);
  }
}

async function associateJobWithRelated_contact() {
  const relatedRelated_contact0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Job0 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Job0?.setRelated_contact) {
    await Job0.setRelated_contact(relatedRelated_contact0);
  }

  const relatedRelated_contact1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Job1 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Job1?.setRelated_contact) {
    await Job1.setRelated_contact(relatedRelated_contact1);
  }

  const relatedRelated_contact2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Job2 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Job2?.setRelated_contact) {
    await Job2.setRelated_contact(relatedRelated_contact2);
  }

  const relatedRelated_contact3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Job3 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Job3?.setRelated_contact) {
    await Job3.setRelated_contact(relatedRelated_contact3);
  }

  const relatedRelated_contact4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Job4 = await Jobs.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Job4?.setRelated_contact) {
    await Job4.setRelated_contact(relatedRelated_contact4);
  }
}

async function associateTemplateWithRelated_trade() {
  const relatedRelated_trade0 = await Trades.findOne({
    offset: Math.floor(Math.random() * (await Trades.count())),
  });
  const Template0 = await Templates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Template0?.setRelated_trade) {
    await Template0.setRelated_trade(relatedRelated_trade0);
  }
}

async function associateInvoiceWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setRelated_job) {
    await Invoice0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setRelated_job) {
    await Invoice1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setRelated_job) {
    await Invoice2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setRelated_job) {
    await Invoice3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice4 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Invoice4?.setRelated_job) {
    await Invoice4.setRelated_job(relatedRelated_job4);
  }
}

async function associateOrderWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setRelated_job) {
    await Order0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setRelated_job) {
    await Order1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setRelated_job) {
    await Order2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setRelated_job) {
    await Order3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Order4 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Order4?.setRelated_job) {
    await Order4.setRelated_job(relatedRelated_job4);
  }
}

async function associateOrderWithRelated_estimate() {
  const relatedRelated_estimate0 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setRelated_estimate) {
    await Order0.setRelated_estimate(relatedRelated_estimate0);
  }

  const relatedRelated_estimate1 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setRelated_estimate) {
    await Order1.setRelated_estimate(relatedRelated_estimate1);
  }

  const relatedRelated_estimate2 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setRelated_estimate) {
    await Order2.setRelated_estimate(relatedRelated_estimate2);
  }

  const relatedRelated_estimate3 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setRelated_estimate) {
    await Order3.setRelated_estimate(relatedRelated_estimate3);
  }

  const relatedRelated_estimate4 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const Order4 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Order4?.setRelated_estimate) {
    await Order4.setRelated_estimate(relatedRelated_estimate4);
  }
}

async function associateImageWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image0 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Image0?.setRelated_job) {
    await Image0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image1 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Image1?.setRelated_job) {
    await Image1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image2 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Image2?.setRelated_job) {
    await Image2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image3 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Image3?.setRelated_job) {
    await Image3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image4 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Image4?.setRelated_job) {
    await Image4.setRelated_job(relatedRelated_job4);
  }
}

async function associateDocumentWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document0 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Document0?.setRelated_job) {
    await Document0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document1 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Document1?.setRelated_job) {
    await Document1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document2 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Document2?.setRelated_job) {
    await Document2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document3 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Document3?.setRelated_job) {
    await Document3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document4 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Document4?.setRelated_job) {
    await Document4.setRelated_job(relatedRelated_job4);
  }
}

async function associateEmailWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Email0 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Email0?.setRelated_job) {
    await Email0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Email1 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Email1?.setRelated_job) {
    await Email1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Email2 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Email2?.setRelated_job) {
    await Email2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Email3 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Email3?.setRelated_job) {
    await Email3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Email4 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Email4?.setRelated_job) {
    await Email4.setRelated_job(relatedRelated_job4);
  }
}

async function associateEmailWithRelated_contact() {
  const relatedRelated_contact0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Email0 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Email0?.setRelated_contact) {
    await Email0.setRelated_contact(relatedRelated_contact0);
  }

  const relatedRelated_contact1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Email1 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Email1?.setRelated_contact) {
    await Email1.setRelated_contact(relatedRelated_contact1);
  }

  const relatedRelated_contact2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Email2 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Email2?.setRelated_contact) {
    await Email2.setRelated_contact(relatedRelated_contact2);
  }

  const relatedRelated_contact3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Email3 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Email3?.setRelated_contact) {
    await Email3.setRelated_contact(relatedRelated_contact3);
  }

  const relatedRelated_contact4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Email4 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Email4?.setRelated_contact) {
    await Email4.setRelated_contact(relatedRelated_contact4);
  }
}

async function associateEmailWithRelated_user() {
  const relatedRelated_user0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email0 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Email0?.setRelated_user) {
    await Email0.setRelated_user(relatedRelated_user0);
  }

  const relatedRelated_user1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email1 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Email1?.setRelated_user) {
    await Email1.setRelated_user(relatedRelated_user1);
  }

  const relatedRelated_user2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email2 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Email2?.setRelated_user) {
    await Email2.setRelated_user(relatedRelated_user2);
  }

  const relatedRelated_user3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email3 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Email3?.setRelated_user) {
    await Email3.setRelated_user(relatedRelated_user3);
  }

  const relatedRelated_user4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email4 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Email4?.setRelated_user) {
    await Email4.setRelated_user(relatedRelated_user4);
  }
}

async function associateChatWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Chat0 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Chat0?.setRelated_job) {
    await Chat0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Chat1 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Chat1?.setRelated_job) {
    await Chat1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Chat2 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Chat2?.setRelated_job) {
    await Chat2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Chat3 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Chat3?.setRelated_job) {
    await Chat3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Chat4 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Chat4?.setRelated_job) {
    await Chat4.setRelated_job(relatedRelated_job4);
  }
}

// Similar logic for "relation_many"

async function associateAppointmentWithAssigned_to() {
  const relatedAssigned_to0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setAssigned_to) {
    await Appointment0.setAssigned_to(relatedAssigned_to0);
  }

  const relatedAssigned_to1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setAssigned_to) {
    await Appointment1.setAssigned_to(relatedAssigned_to1);
  }

  const relatedAssigned_to2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setAssigned_to) {
    await Appointment2.setAssigned_to(relatedAssigned_to2);
  }

  const relatedAssigned_to3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setAssigned_to) {
    await Appointment3.setAssigned_to(relatedAssigned_to3);
  }

  const relatedAssigned_to4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setAssigned_to) {
    await Appointment4.setAssigned_to(relatedAssigned_to4);
  }
}

async function associateAppointmentWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setRelated_job) {
    await Appointment0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setRelated_job) {
    await Appointment1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setRelated_job) {
    await Appointment2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setRelated_job) {
    await Appointment3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setRelated_job) {
    await Appointment4.setRelated_job(relatedRelated_job4);
  }
}

async function associateAppointmentWithRelated_contact() {
  const relatedRelated_contact0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setRelated_contact) {
    await Appointment0.setRelated_contact(relatedRelated_contact0);
  }

  const relatedRelated_contact1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setRelated_contact) {
    await Appointment1.setRelated_contact(relatedRelated_contact1);
  }

  const relatedRelated_contact2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setRelated_contact) {
    await Appointment2.setRelated_contact(relatedRelated_contact2);
  }

  const relatedRelated_contact3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setRelated_contact) {
    await Appointment3.setRelated_contact(relatedRelated_contact3);
  }

  const relatedRelated_contact4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setRelated_contact) {
    await Appointment4.setRelated_contact(relatedRelated_contact4);
  }
}

async function associateTaskWithAssigned_to() {
  const relatedAssigned_to0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setAssigned_to) {
    await Task0.setAssigned_to(relatedAssigned_to0);
  }

  const relatedAssigned_to1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setAssigned_to) {
    await Task1.setAssigned_to(relatedAssigned_to1);
  }

  const relatedAssigned_to2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setAssigned_to) {
    await Task2.setAssigned_to(relatedAssigned_to2);
  }

  const relatedAssigned_to3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task3 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Task3?.setAssigned_to) {
    await Task3.setAssigned_to(relatedAssigned_to3);
  }

  const relatedAssigned_to4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task4 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Task4?.setAssigned_to) {
    await Task4.setAssigned_to(relatedAssigned_to4);
  }
}

async function associateTaskWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setRelated_job) {
    await Task0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setRelated_job) {
    await Task1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setRelated_job) {
    await Task2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Task3 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Task3?.setRelated_job) {
    await Task3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Task4 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Task4?.setRelated_job) {
    await Task4.setRelated_job(relatedRelated_job4);
  }
}

async function associateContractWithRelated_contact() {
  const relatedRelated_contact0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Contract0 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contract0?.setRelated_contact) {
    await Contract0.setRelated_contact(relatedRelated_contact0);
  }

  const relatedRelated_contact1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Contract1 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contract1?.setRelated_contact) {
    await Contract1.setRelated_contact(relatedRelated_contact1);
  }

  const relatedRelated_contact2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Contract2 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contract2?.setRelated_contact) {
    await Contract2.setRelated_contact(relatedRelated_contact2);
  }

  const relatedRelated_contact3 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Contract3 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Contract3?.setRelated_contact) {
    await Contract3.setRelated_contact(relatedRelated_contact3);
  }

  const relatedRelated_contact4 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Contract4 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Contract4?.setRelated_contact) {
    await Contract4.setRelated_contact(relatedRelated_contact4);
  }
}

async function associateContractWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Contract0 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contract0?.setRelated_job) {
    await Contract0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Contract1 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contract1?.setRelated_job) {
    await Contract1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Contract2 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contract2?.setRelated_job) {
    await Contract2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Contract3 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Contract3?.setRelated_job) {
    await Contract3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Contract4 = await Contracts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Contract4?.setRelated_job) {
    await Contract4.setRelated_job(relatedRelated_job4);
  }
}

async function associateAmendmentWithRelated_job() {
  const relatedRelated_job0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Amendment0 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Amendment0?.setRelated_job) {
    await Amendment0.setRelated_job(relatedRelated_job0);
  }

  const relatedRelated_job1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Amendment1 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Amendment1?.setRelated_job) {
    await Amendment1.setRelated_job(relatedRelated_job1);
  }

  const relatedRelated_job2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Amendment2 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Amendment2?.setRelated_job) {
    await Amendment2.setRelated_job(relatedRelated_job2);
  }

  const relatedRelated_job3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Amendment3 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Amendment3?.setRelated_job) {
    await Amendment3.setRelated_job(relatedRelated_job3);
  }

  const relatedRelated_job4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Amendment4 = await Amendments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Amendment4?.setRelated_job) {
    await Amendment4.setRelated_job(relatedRelated_job4);
  }
}

async function associateEstimateSectionWithRelated_estimate() {
  const relatedRelated_estimate0 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const EstimateSection0 = await EstimateSections.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (EstimateSection0?.setRelated_estimate) {
    await EstimateSection0.setRelated_estimate(relatedRelated_estimate0);
  }

  const relatedRelated_estimate1 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const EstimateSection1 = await EstimateSections.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (EstimateSection1?.setRelated_estimate) {
    await EstimateSection1.setRelated_estimate(relatedRelated_estimate1);
  }

  const relatedRelated_estimate2 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const EstimateSection2 = await EstimateSections.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (EstimateSection2?.setRelated_estimate) {
    await EstimateSection2.setRelated_estimate(relatedRelated_estimate2);
  }

  const relatedRelated_estimate3 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const EstimateSection3 = await EstimateSections.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (EstimateSection3?.setRelated_estimate) {
    await EstimateSection3.setRelated_estimate(relatedRelated_estimate3);
  }

  const relatedRelated_estimate4 = await Estimates.findOne({
    offset: Math.floor(Math.random() * (await Estimates.count())),
  });
  const EstimateSection4 = await EstimateSections.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (EstimateSection4?.setRelated_estimate) {
    await EstimateSection4.setRelated_estimate(relatedRelated_estimate4);
  }
}

async function associateEstimateSectionWithRelated_template() {
  const relatedRelated_template0 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const EstimateSection0 = await EstimateSections.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (EstimateSection0?.setRelated_template) {
    await EstimateSection0.setRelated_template(relatedRelated_template0);
  }

  const relatedRelated_template1 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const EstimateSection1 = await EstimateSections.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (EstimateSection1?.setRelated_template) {
    await EstimateSection1.setRelated_template(relatedRelated_template1);
  }

  const relatedRelated_template2 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const EstimateSection2 = await EstimateSections.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (EstimateSection2?.setRelated_template) {
    await EstimateSection2.setRelated_template(relatedRelated_template2);
  }

  const relatedRelated_template3 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const EstimateSection3 = await EstimateSections.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (EstimateSection3?.setRelated_template) {
    await EstimateSection3.setRelated_template(relatedRelated_template3);
  }

  const relatedRelated_template4 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const EstimateSection4 = await EstimateSections.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (EstimateSection4?.setRelated_template) {
    await EstimateSection4.setRelated_template(relatedRelated_template4);
  }
}

async function insertTemplateRelatesTrada(templateId, tradeId) {
  try {
    // Write raw SQL insert query
    // const query = `
    //   INSERT INTO Templates (name, description, trade, createdAt, updatedAt)
    //   VALUES (:name, :description, :trade, NOW(), NOW())
    // `;

    // Execute raw SQL insert using sequelize.query()
    // await db.sequelize.query(query, {
    //   replacements: {
    //     name: name,
    //     description: description,
    //     trade: trade
    //   }
    // });
  } catch (err) {}
}

// // Write raw SQL insert query
// const query = `
//       INSERT INTO Templates (name, description, trade, createdAt, updatedAt)
//       VALUES (:name, :description, :trade, NOW(), NOW())
//     `;
//
// // Execute raw SQL insert using sequelize.query()
// await sequelize.query(query, {
//   replacements: {
//     name: name,
//     description: description,
//     trade: trade
//   }
// });


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Contacts.bulkCreate(ContactsData);

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

    await EstimateSections.bulkCreate(EstimateSectionsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateEstimateWithRelated_contact(),

      await associateEstimateWithRelated_job(),

      await associateJobWithAssigned_to(),

      await associateJobWithRelated_contact(),

      // await associateTemplateWithRelated_trade(),

      await associateInvoiceWithRelated_job(),

      await associateOrderWithRelated_job(),

      await associateOrderWithRelated_estimate(),

      await associateImageWithRelated_job(),

      await associateDocumentWithRelated_job(),

      await associateEmailWithRelated_job(),

      await associateEmailWithRelated_contact(),

      await associateEmailWithRelated_user(),

      await associateChatWithRelated_job(),

      // Similar logic for "relation_many"

      await associateAppointmentWithAssigned_to(),

      await associateAppointmentWithRelated_job(),

      await associateAppointmentWithRelated_contact(),

      await associateTaskWithAssigned_to(),

      await associateTaskWithRelated_job(),

      await associateContractWithRelated_contact(),

      await associateContractWithRelated_job(),

      await associateAmendmentWithRelated_job(),

      await associateEstimateSectionWithRelated_estimate(),

      await associateEstimateSectionWithRelated_template(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contacts', null, {});

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

    await queryInterface.bulkDelete('estimate_sections', null, {});
  },
};
