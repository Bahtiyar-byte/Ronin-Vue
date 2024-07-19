import express, { type Response, type Request } from 'express';
import EstimatesService from '../services/estimates.ts';
import multer from 'multer';

const router = express.Router();

const wrapAsync = require('../helpers').wrapAsync;

const upload = multer({ dest: 'uploads/' })

router.post(
    '/send',
    upload.single('attachments'),
    wrapAsync(async (req: Request, res: Response) => {
        const estimatesService =  new EstimatesService()

        res.status(200).send({
            sent: await estimatesService.sendToCustomer(req.body.estimate, {
                ...req.body.additionalData,
                attachments: [req.file],
            })
        })
    })
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
