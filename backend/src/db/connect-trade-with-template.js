const db = require("./models");

const TemplatesData = [
    {
        name: 'Aluminum/ Flashing',

        description: 'Aluminum/ Flashing',

        trade : 'Aluminum/ Flashing',

        related_trade: []

        // type code here for "relation_one" field
    },

    {
        name: 'Box Gutter Service- Mule Hide',

        description: 'Install new Mule-Hide silicone patch to necessary seams, cracks, holes and eave tubes in gutter system.\n' +
            'Install new Mule-Hide silicone rubber system to entire box gutter system.',

        trade: 'Box Gutters',

        related_trade: []
    },

    {
        name: 'Box Gutter Service: Gaco',

        description: 'Install new Gaco silicone patch to necessary seams, cracks, holes and eave tubes in gutter system.\n' +
            'Install new Gaco silicone rubber system to entire box gutter system.',

        trade: 'Box Gutters',

        related_trade: []
        // type code here for "relation_one" field
    },

    {
        name: 'Inspection Report',

        description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow',

        trade: 'Box Gutters',

        related_trade: []

        // type code here for "relation_one" field
    },

    {
        name: 'Charles Darwin',

        description: 'Younglings, younglings gather ’round.',

        trade: 'Box Gutters',

        related_trade: []

        // type code here for "relation_one" field
    },

    {
        name: 'Downspouts',

        description: 'Downspouts',

        trade: 'Downspouts',

        related_trade: []
    },

    {
        name: 'EPDM Roof',

        description: 'Remove existing roof down to roof deck.\n' +
            'Install new half-inch fiber insulation board to entire roof.\n' +
            'Install new EPDM 0.60 mil glue-down system rubber roof.',

        trade: 'EPDM',

        related_trade: []
    },

    {
        name: 'Inspection Report',

        description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',

        trade: 'EPDM',

        related_trade: []

    },

    {
        name: 'Flat Roofing',

        description: 'Flat Roofing',

        trade: 'Flat Roof',

        related_trade: []

    },

    {
        name: 'Shur Flo Gutter Guards 5"',

        description: 'Install new aluminum Shur Flo gutter guard system. Zip screw gutter guards to the existing gutters. Warranty: Labor comes with 15-year labor warranty.',

        trade: 'Gutter Guards',

        related_trade: []

    },

    {
        name: 'Shur Flo Gutter Guards 6"',

        description: 'Install new aluminum Shur Flo gutter guard system. Zip screw gutter guards to the existing gutters. Warranty: Labor comes with 15-year labor warranty.',

        trade: 'Gutter Guards',

        related_trade: []

    },

    {
        name: '5" Gutters',

        description: '\n' +
            '- We will remove and dispose of the existing gutters and downspouts.\n' +
            '- New 5" aluminum seamless gutters will be installed.  Color selection to be picked out by homeowner.\n' +
            '- Install new 2x3 downspouts.',

        trade: 'Gutters',

        related_trade: []

    },

    {
        name: '6" Gutters',

        description: '- We will remove and dispose of the existing gutters and downspouts.\n' +
            '- New 6" aluminum seamless gutters will be installed.  Color selection to be picked out by homeowner.\n' +
            '- Install new downspouts.',

        trade: 'Gutters',

        related_trade: []

    },

    {
        name: 'Box Gutter Service- Mule Hide',

        description: 'Install new Mule-Hide silicone patch to necessary seams, cracks, holes and eave tubes in gutter system.\n' +
            'Install new Mule-Hide silicone rubber system to entire box gutter system.',

        trade: 'Gutters',

        related_trade: []

    },

    {
        name: 'Box Gutter Service: Gaco',

        description: 'Install new Gaco silicone patch to necessary seams, cracks, holes and eave tubes in gutter system.\n' +
            'Install new Gaco silicone rubber system to entire box gutter system',

        trade: 'Gutters',

        related_trade: []

    },

    {
        name: 'Downspouts',

        description: 'Downspouts',

        trade: 'Gutters',

        related_trade: []

    },

    {
        name: 'Inspection Report',

        description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',

        trade: 'Gutters',

        related_trade: []

    },

    {
        name: 'Shur Flo Gutter Guards 5"',

        description: 'Install new aluminum Shur Flo gutter guard system. Zip screw gutter guards to the existing gutters.\n' +
            '\n' +
            'Warranty: Labor comes with 15-year labor warranty',

        trade: 'Gutters',

        related_trade: []

    },

    {
        name: 'Shur Flo Gutter Guards 6"',

        description: 'Install new aluminum Shur Flo gutter guard system. Zip screw gutter guards to the existing gutters.\n' +
            '\n' +
            'Warranty: Labor comes with 15-year labor warranty',

        trade: 'Gutters',

        related_trade: []

    },

    {
        name: 'Inspection Report',

        description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',

        trade: 'Metal',

        related_trade: []

    },

    {
        name: 'Metal Roofing',

        description: 'Remove existing layer of roof down to roof deck.\n' +
            'Removal of any additional layers will be an additional cost of $75 per square. Tighten down any loose decking using eight-penny nails. Any bad lumber will be replaced at an additional $5.50/linear foot or $75 per 7/16 sheet OSB',

        trade: 'Metal',

        related_trade: []

    },

    {
        name: 'Ventilation',

        description: 'Install Lomanco Deck-Air ventilation at the eaves. (     )\n' +
            'The Deck-Air®, when properly installed with proper exhaust vents, provides a balanced ventilation system to rid your attic space of trapped heat and moisture',
        trade: 'Metal',

        related_trade: []

    },

    {
        name: 'Brad GAF Template',

        description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square.\n' +
            'Tighten down any loose decking using eight-penny nails.  Any bad lumber will be replaced at an additional $5.50/linear foot OR $75 per 7/16 sheet OSB',
        trade: 'Roofing',

        related_trade: []

    },

    {
        name: 'EPDM Roof',

        description: 'Remove existing roof down to roof deck.\n' +
            'Install new half-inch fiber insulation board to entire roof.\n' +
            'Install new EPDM 0.60 mil glue-down system rubber roof',
        trade: 'Roofing',

        related_trade: []

    },

    {
        name: 'Gaco',

        description: 'Install new Gaco silicone patch to necessary seams, drains, pipes, and extrusions on entire roof. \n' +
            'Install new Gaco silicone roof system to entire roof.\n' +
            'Clean up and haul away all debris',
        trade: 'Roofing',

        related_trade: []

    },

    {
        name: 'GAF Timberline HDZ- ABC',

        description: 'Remove existing layer of roof down to roof deck. Removal of any additional layers will be an additional cost of $75 per square.\n' +
            'Tighten down any loose decking using eight-penny nails.  Any bad lumber will be replaced at an additional $5.50/linear foot OR $75 per 7/16 sheet OSB',
        trade: 'Roofing',

        related_trade: []

    },

    {
        name: 'Mule Hide',

        description: 'Install new Mule-Hide silicone patch to necessary seams, drains, pipes, and extrusions on entire roof.\n' +
            'Install new Mule-Hide silicone roof system to entire roof.\n' +
            'Clean up and haul away all debris',
        trade: 'Roofing',

        related_trade: []

    },

    {
        name: 'Slate Service Call',

        description: 'Service slate roof by replacing any missing or damaged slate.\n' +
            'Slate will be replaced at an additional $50/piece.',
        trade: 'Roofing',

        related_trade: []

    },

    {
        name: 'Service Repairs',

        description: 'Service Repairs',
        trade: 'Service Repairs',

        related_trade: []

    },

    {
        name: 'Service Repairs: Tile Roof',

        description: 'Service tile roof by replacing any missing or damaged slate.\n' +
            'Tile will be replaced at an additional $50/piece',
        trade: 'Service Repairs',

        related_trade: []

    },

    {
        name: 'Slate Service Call',

        description: 'Service slate roof by replacing any missing or damaged slate.\n' +
            'Slate will be replaced at an additional $50/piece.',
        trade: 'Service Repairs',

        related_trade: []

    },

    {
        name: 'Siding Template',

        description: 'Siding',
        trade: 'Siding',

        related_trade: []

    },

    {
        name: 'Gaco',

        description: 'Install new Gaco silicone patch to necessary seams, drains, pipes, and extrusions on entire roof. \n' +
            'Install new Gaco silicone roof system to entire roof.\n' +
            'Clean up and haul away all debris.',
        trade: 'Silicone',
        related_trade: []

    },


    {
        name: 'Henry Silicone',

        description: 'Install new Henry silicone patch to necessary seams, drains, pipes, and extrusions on entire roof. \n' +
            'Install new Henry silicone roof system to entire roof.\n' +
            'Clean up and haul away all debris.',
        trade: 'Silicone',
        related_trade: []

    },

    {
        name: 'Inspection Report',

        description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow',
        trade: 'Silicone',
        related_trade: []

    },

    {
        name: 'Mule Hide',

        description: 'Install new Mule-Hide silicone patch to necessary seams, drains, pipes, and extrusions on entire roof.\n' +
            'Install new Mule-Hide silicone roof system to entire roof.\n' +
            'Clean up and haul away all debris',
        trade: 'Silicone',
        related_trade: []

    },

    {
        name: 'Inspection Report',

        description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',
        trade: 'Slate',
        related_trade: []

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
        trade: 'Shingles',
        related_trade: []

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
        trade: 'Shingles',
        related_trade: []

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
        trade: 'Shingles',
        related_trade: []

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
        trade: 'Shingles',
        related_trade: []

    },



    {
        name: 'Inspection Report',

        description: 'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow: ',
        trade: 'Shingles',
        related_trade: []

    },

    {
        name: 'Ventilation',

        description: 'Install Lomanco Deck-Air ventilation at the eaves. (     )\n' +
            'The Deck-Air®, when properly installed with proper exhaust vents, provides a balanced ventilation system to rid your attic space of trapped heat and moisture.\n' +
            'The DA-4 is an excellent solution for roofs with little or no overhang for the installation of traditional intake vents.\n' +
            '\n' +
            '* Any Permit fees to be paid by homeowner.\n' +
            'Also if choosing to pay with a credit card, there will be a 3.5% fee applied on top of the project bill.*',
        trade: 'Shingles',
        related_trade: []

    },

    {
        name: 'Slate Service Call',

        description: 'Service slate roof by replacing any missing or damaged slate.\n' +
            'Slate will be replaced at an additional $50/piece',
        trade: 'Slate',
        related_trade: []

    },

    {
        name: 'Inspection Report',

        description: '\n' +
            'Evans Roofing and Gutters Completed and Inspection Report on this Property the findings to follow:',
        trade: 'Tile',
        related_trade: []

    },

    {
        name: 'Service Repairs: Tile Roof',

        description: 'Service tile roof by replacing any missing or damaged slate.\n' +
            'Tile will be replaced at an additional $50/piece.',
        trade: 'Tile',
        related_trade: []

    },

    {
        name: 'TPO',

        description: '\n' +
            'GAF TPO RE-COVER\n' +
            '• REMOVE ALL WALL FLASHINGS, TERMINATION BAR, PIPE FLASHINGS TO PREP FOR NEW ROOFING SYSTEM.\n' +
            '• REMOVE LAST APPIED ROOFING SYSTEM LEAVING THE ORIGINAL IN TACT',
        trade: 'Tile',
        related_trade: []

    },

    {
        name: 'TPO',

        description: '\n' +
            'GAF TPO RE-COVER\n' +
            '• REMOVE ALL WALL FLASHINGS, TERMINATION BAR, PIPE FLASHINGS TO PREP FOR NEW ROOFING SYSTEM.\n' +
            '• REMOVE LAST APPIED ROOFING SYSTEM LEAVING THE ORIGINAL IN TACT',
        trade: 'TPO',
        related_trade: []

    },

    {
        name: 'Ventilation',

        description: 'Install Lomanco Deck-Air ventilation at the eaves. (     )\n' +
            'The Deck-Air®, when properly installed with proper exhaust vents, provides a balanced ventilation system to rid your attic space of trapped heat and moisture.',
        trade: 'Ventilation',

        related_trade: []

    },
];

module.exports = class ConnectTradeWithTemplte {

    static async getTradeId(tradeName){
        try {
            const trade = await db.trades.findOne({
                where: {name : tradeName},
            });
            return trade? trade.id : null;
        } catch (error) {}
    }

    static async updateTemplateWithTrade(){
        for(const template of TemplatesData){
            const tradeId = await this.getTradeId(template.trade);
            const templateId = await this.getTemplateId(template.name);
            if (tradeId && templateId) {
                this.insertIntoPivotTable(templateId, tradeId)
            }
        }
    }

    static async  getTemplateId(templateName){
        try {
            const template = await db.templates.findOne({
                where: {name : templateName},
            });
            return template? template.id : null;
        } catch (error) {}
    }



    static async insertIntoPivotTable(templateId, tradeId) {
        try {
            const query = `
   INSERT INTO "public"."templatesRelated_tradeTrades" ("templates_related_tradeId", "tradeId", "createdAt", "updatedAt")
   VALUES (:templates_related_tradeId, :tradeId, NOW(), NOW())
   ON CONFLICT ("templates_related_tradeId", "tradeId") DO NOTHING
 `;

            await db.sequelize.query(query, {
                replacements: {
                    templates_related_tradeId: templateId,
                    tradeId: tradeId,
                },
            });

            console.log('Record inserted into pivot table (if it didn\'t already exist)');
        } catch (error) {
            console.error('Error inserting record into pivot table:', error);
        }
    }

}
