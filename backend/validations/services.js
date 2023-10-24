const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// array of possible service categories that can be provided
const categories = [
    'photography',
    'gardening',
    'art',
    'modeling'
];

// array of possible compensation options that can be provided
const compOptions = [
    'Provide Yelp review',
    'Provide Google review',
    'Post on Instagram and tag account'
];

// validateServiceInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit
// a service
const validateServiceInput = [
  check('category')
    .exists({ checkFalsy: true })
    .isIn(categories)
    .withMessage('Service needs to be a valid service'),
  check('compensation')
    .exists({ checkFalsy: true })
    .isIn(compOptions)
    .withMessage('Compensation needs to be a valid option'),
  handleValidationErrors
];

module.exports = validateServiceInput;