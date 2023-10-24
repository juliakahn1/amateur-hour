const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Job = mongoose.model('Job');
const { requireUser } = require('../../config/passport');
const validateJobInput = require('../../validations/jobs');

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate({
                path: 'service',
                populate: ({ path: 'provider', select: '_id firstName lastName' })
            })
            .populate("client", "_id firstName lastName location")
            .sort({ createdAt: -1 });
        return res.json(jobs);
    }
    catch(err) {
        return res.json([]);
    }
});

router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId);
    } catch(err) {
        const error = new Error('User not found');
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try {
        const jobs = await Job.find({ client: user._id })
            .populate({
                path: 'service',
                populate: ({ path: 'provider', select: '_id firstName lastName' })
            })
            .populate("client", "_id firstName lastName location")
            .sort({ createdAt: -1 })
        return res.json(jobs);
    }
    catch(err) {
        return res.json([]);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate({
                path: 'service',
                populate: ({ path: 'provider', select: '_id firstName lastName' })
            })
            .populate("client", "_id firstName lastName location");
        return res.json(job);
    } catch(err) {
        const error = new Error('Job not found');
        error.statusCode = 404;
        error.errors = { message: "No job found with that id"};
        return next(error);
    }
});

router.post('/', requireUser, validateJobInput, async (req, res, next) => {
    // check to make sure the user has not already requested a job from this service
    const job = await Job.findOne({
        client: req.user._id,
        service: req.body.service
    });

    if (job) {
        // Throw a 400 error if the email address and/or email already exists
        const err = new Error("Validation Error");
        err.statusCode = 400;
        const errors = {};
        if (job.service === req.body.service) {
            errors.service = "You have already requested this service";
        }
        err.errors = errors;
        return next(err);
    }

    try {
        const newJob = new Job({
            service: req.body.service,
            client: req.user._id,
            statusDescription: "requested",
            date: req.body.date,
            description: req.body.description
        })

        let job = await newJob.save();
        job = await job.populate({
            path: "service", 
            populate: {
                path: "provider",
                select: "_id firstName lastName email"
            },
            select: "category compensation"
        });
        job = await job.populate("client", "_id firstName lastName email");
        return res.json(job);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;