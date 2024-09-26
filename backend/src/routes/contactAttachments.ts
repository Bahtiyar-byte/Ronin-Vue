import express, { type Response, type Request } from 'express';
const db = require('../db/models');

const router = express.Router();

const wrapAsync = require('../helpers').wrapAsync;

router.get(
    '/documents/count',
    wrapAsync(async (req: Request, res: Response) => {
        const contactId = req.query.related_contact;

        if (!contactId) {
            return res.status(400).send({ error: 'Contact ID is required' });
        }

        let count = await db.documents.count({
            distinct: true,
            include: {
                model: db.jobs,
                as: 'related_job',
                required: true,
                include: {
                    model: db.contacts,
                    as: 'related_contact',
                    required: true,
                    where: { id: contactId }
                }
            },
        });

        res.status(200).send({ count });
    }),
);

router.get(
    '/invoices/count',
    wrapAsync(async (req: Request, res: Response) => {
        const contactId = req.query.related_contact;

        if (!contactId) {
            return res.status(400).send({ error: 'Contact ID is required' });
        }

        let count = await db.invoices.count({
            distinct: true,
            include: {
                model: db.jobs,
                as: 'related_job',
                required: true,
                include: {
                    model: db.contacts,
                    as: 'related_contact',
                    required: true,
                    where: { id: contactId }
                }
            },
        });

        res.status(200).send({ count });
    }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
