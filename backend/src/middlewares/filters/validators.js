

module.exports.validateGetVariantsRequiredParams = (req, res, next) => {
    const { entity, column } = req.query;

    if (!entity || !column) {
        return res.status(400).send({
            message: 'Both entity and column parameters are required'
        });
    }

    next();
};
