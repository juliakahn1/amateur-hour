const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');
const compOptions = require("../../frontend/src/constants");
const serviceCategories = require("../../frontend/src/constants");

// array of possible service categories that can be provided
// const categories = [
//     'photography',
//     'gardening',
//     'art',
//     'modeling'
// ];

// array of possible compensation options that can be provided
// const compOptions = [
//     'Yelp review',
//     'Google review',
//     'Instagram post and tag account'
// ];

// validateServiceInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit
// a service
const validateServiceInput = [
  check('category')
    .exists({ checkFalsy: true })
    .isIn(serviceCategories)
    .withMessage('Service needs to be a valid service'),
  check('compensation')
    .exists({ checkFalsy: true })
    .isIn(compOptions)
    .withMessage('Compensation needs to be a valid option'),
  handleValidationErrors
];

exports.compOptions = compOptions;

module.exports = validateServiceInput;
