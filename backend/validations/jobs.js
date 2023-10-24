const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');
const { statusOptions } = require('../../frontend/src/constants');

const validateJobInput = [
    check('statusDescription')
        .exists({ checkFalse: true })
        .isIn(statusOptions)
        .withMessage('Status does not exist in job request flow'),
    check('date')
        // To delete leading and trailing space
        .trim()
        // Validate DOB to be a valid date
        .isDate()
        // Custom message
        .withMessage('Must be a valid date'),
    handleValidationErrors
];

module.exports = validateJobInput;