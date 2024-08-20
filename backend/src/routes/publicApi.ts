import express, { type Response, type Request } from 'express'
const ContractsDBApi = require('../db/api/contracts.ts').default

const router = express.Router();

const wrapAsync = require('../helpers').wrapAsync;

router.get(
    '/contact-acceptance/:id',
    wrapAsync(async (req: Request, res: Response) => {
        res.status(200).send({
            contract: await ContractsDBApi.getContractPublicData(req.params.id),
        })
    })
)

router.post(
    '/contact-acceptance/:id',
    wrapAsync(async (req: Request, res: Response) => {
        res.status(200).send({
            accepted: true,
        })
    })
)

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
