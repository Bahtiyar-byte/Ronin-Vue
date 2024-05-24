const express = require('express');
const RolesDBApi = require("../../db/api/roles");
const {parse} = require("json2csv");

// const RolesService = require('../../services/roles');
// const RolesDBApi = require('../../db/api/roles');
const wrapAsync = require('../../helpers').wrapAsync;

const router = express.Router();

/**
 *  @swagger
 * tags:
 *   name: Filters
 *   description: The Filters managing API
 */

/**
 *  @swagger
 *  /api/filters/variants:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Filters]
 *      summary: Get available filter variants
 *      description: Get available filter variants
 *      responses:
 *        200:
 *          description: Filter variants list successfully received
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */

router.get(
    '/variants',
    wrapAsync(async (req, res) => {
        // const payload = await RolesDBApi.findAll(req.query);

        console.log(req)

        res.status(200).send({
            test: 'test111',
        });
    }),
);

router.use('/', require('../../helpers').commonErrorHandler);

module.exports = router;
