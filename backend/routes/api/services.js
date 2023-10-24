const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Service = mongoose.model('Service');
const { requireUser } = require('../../config/passport');
const validateServiceInput = require('../../validations/services');

// get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find()
            .populate("provider", "_id firstName lastName location")
            .sort({ createdAt: -1 });
        return res.json(services);
    }
    catch (err) {
        return res.json([]);
    }
});

// get all services for a specific user
router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId);
    } catch (err) {
        const error = new Error('User not found');
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try {
        const services = await Service.find({ provider: user._id })
            .sort({ createdAt: -1 })
            .populate("provider", "_id firstName lastName location");
        return res.json(services);
    }
    catch (err) {
        return res.json([]);
    }
});

// get a specific service
router.get('/:id', async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id)
            .populate("provider", "_id firstName lastName location");
        return res.json(service);
    }
    catch (err) {
        const error = new Error('Service not found');
        error.statusCode = 404;
        error.errors = { message: "No service found with that id" };
        return next(error);
    }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no
// current user.) Also attach validateServiceInput as a middleware before the
// route handler.
router.post('/', requireUser, validateServiceInput, async (req, res, next) => {
    // Check to make sure a user does not already have a service with the proposed
    // category.
    const service = await Service.findOne({ provider: req.user._id, category: req.body.category });

    if (service) {
        // Throw a 400 error if the email address and/or email already exists
        const err = new Error("Validation Error");
        err.statusCode = 400;
        const errors = {};
        if (service.category === req.body.category) {
            errors.category = "You already have a service in this category";
        }
        err.errors = errors;
        return next(err);
    }

    try {
        const newService = new Service({
            category: req.body.category,
            provider: req.user._id,
            compensation: req.body.compensation,
            instagramLink: req.body.instagramLink,
            yelpLink: req.body.yelpLink,
            otherLink: req.body.otherLink,
        });

        let service = await newService.save();
        service = await service.populate('provider', '_id firstName lastName location');
        return res.json(service);
    }
    catch (err) {
        next(err);
    }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no
// current user.) Also attach validateServiceInput as a middleware before the
// route handler.
router.patch('/:id', requireUser, validateServiceInput, async (req, res, next) => {
    try {
        const filter = { _id: req.params.id };
        let service = await Service.findOneAndUpdate(filter, req.body, {
            new: true
        });
        service = await service.populate('provider', '_id firstName lastName location');
        return res.json(service);
    }
    catch (err) {
        next(err);
    }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no
// current user.) Also attach validateServiceInput as a middleware before the
// route handler.
router.delete('/:id', requireUser, validateServiceInput, async (req, res, next) => {
    try {
        const filter = { _id: req.params.id };
        let service = await Service.findOneAndDelete(filter);
        return res.json(service);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
