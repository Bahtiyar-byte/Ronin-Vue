const express = require('express');

const FiltersDBApi = require('../db/api/filters');

const wrapAsync = require('../helpers').wrapAsync;

const validators = require('../middlewares/filters/validators')

const router = express.Router();

router.get('/variants'
    , validators.validateGetVariantsRequiredParams
    , wrapAsync(async (req, res) => {
        const payload = await FiltersDBApi.findVariants(req.query);

        res.status(200).send(payload);
}))


router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
