const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');
const { statusOptions } = require('../../frontend/src/constants');

const validateJobInput = [
    check('statusDescription')
        .exists({ checkFalsy: true})
        .isIn(statusOptions)
        .withMessage('Not a valid status in the job request workflow'),
    handleValidationErrors
];

module.exports = validateJobInput;