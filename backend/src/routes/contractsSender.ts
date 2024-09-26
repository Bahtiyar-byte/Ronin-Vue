import express, { type Response, type Request } from 'express';
import ContractsService from '../services/contracts.ts';
import multer from 'multer';

const router = express.Router();

const wrapAsync = require('../helpers').wrapAsync;

const upload = multer({ dest: 'uploads/' })

router.post(
    '/send',
    upload.single('attachments'),
    wrapAsync(async (req: Request, res: Response) => {
        const contractsService =  new ContractsService()

        res.status(200).send({
            sent: await contractsService.sendToCustomer(req.body.contract, {
                ...req.body.additionalData,
                attachments: [req.file],
            })
        })
    })
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
