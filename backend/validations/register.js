const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');
const { locationOptions } = require('../../frontend/src/constants');

// validateRegisterInput is a combination Express middleware that uses the 
// `check` middleware to validate the keys in the body of a request to 
// register a user
const validateRegisterInput = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Email is invalid'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage('First name must be between 1 and 30 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage('Last name must be between 1 and 30 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 8 and 30 characters'),
  check('location')
    .exists({ checkFalsy: true })
    .isIn(locationOptions)
    .withMessage('Location is invalid'),
  handleValidationErrors
];

module.exports = validateRegisterInput;