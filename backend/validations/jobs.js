const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

//// status will be updated from routes only and not passed in from the front-end
// const { statusOptions } = require('../../frontend/src/constants');

const validateJobInput = [
    //// isDate is no longer used. Consider using ISO if it matches frontend date input
    // check('date')
    //     .isDate()
    //     .withMessage('Date is not valid'),
    
    handleValidationErrors
];

module.exports = validateJobInput;