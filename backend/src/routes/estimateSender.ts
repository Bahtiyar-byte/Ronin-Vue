import express, { type Response, type Request } from 'express';

const router = express.Router();

const wrapAsync = require('../helpers').wrapAsync;

router.post(
    '/send',
    wrapAsync(async (req: Request, res: Response) => {
        res.status(200).send({
            result: true,
        })
    })
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
