import express, { type Response, type Request } from 'express';

const router = express.Router();

const wrapAsync = require('../helpers').wrapAsync;

router.get(
    '/contact-acceptance',
    wrapAsync(async (req: Request, res: Response) => {
        res.status(200).send({
            reqIsOk: true,
        })
    })
)

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
