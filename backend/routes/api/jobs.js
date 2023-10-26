const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Job = mongoose.model('Job');
const Service = mongoose.model('Service');
const { requireUser } = require('../../config/passport');
const validateJobInput = require('../../validations/jobs');

// get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate({
                path: 'service',
                populate: ({ path: 'provider', select: '_id firstName email' })
            })
            .populate("client", "_id firstName email")
            .sort({ createdAt: -1 });
        return res.json(jobs);
    } catch(err) {
        return res.json({errors: 'No jobs found'});
    }
});

// get all jobs with specified client
router.get('/client/:userId', async (req, res, next) => {
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
                populate: ({ path: 'provider', select: '_id firstName email' })
            })
            .populate("client", "_id firstName email")
            .sort({ createdAt: -1 })
        return res.json(jobs);
    } catch(err) {
        return res.json([]);
    }
});

// get all jobs for the provider's FIRST service.
//// TODO: get jobs for all services once we allow providers to have more than one service
router.get('/provider/:userId', async (req, res, next) => {
    let user;
    let firstService;
    try {
        user = await User.findById(req.params.userId);
        firstService = await Service.findOne({ provider: user._id })
    } catch(err) {
        const error = new Error('Service not found');
        error.statusCode = 404;
        if (user._id === req.params.userId) {
            error.errors = { message: "No service found with that user" };
        } else {
            error.errors = { message: "No user found with that id" };
        }
        return next(error);
    }
    try {
        const jobs = await Job.find({ service: firstService._id })
            .populate({
                path: 'service',
                populate: ({ path: 'provider', select: '_id firstName email' })
            })
            .populate("client", "_id firstName email")
            .sort({ createdAt: -1 })
        return res.json(jobs);
    } catch(err) {
        return res.json([]);
    }
});

// get job with specified id
router.get('/:id', async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate({
                path: 'service',
                populate: ({ path: 'provider', select: '_id firstName lastName email' })
            })
            .populate("client", "_id firstName lastName location email");
        return res.json(job);
    } catch(err) {
        const error = new Error('Job not found');
        error.statusCode = 404;
        error.errors = { message: "No job found with that id"};
        return next(error);
    }
});

//// create job
//// attach requireUser as middleware before route handler to gain access to req.user
router.post('/', requireUser, validateJobInput, async (req, res, next) => {
    let user;
    let service;
    try {
        user = await User.findById(req.params.userId);
        service = await Service.findById(req.body.service);
    } catch(err) {
        const error = new Error('Job could not be not created');
        error.statusCode = 404;
        error.errors = { message: "User or service could not be found" };
        return next(error);
    }
    // check to make sure the user has not already requested a job from this service
    const job = await Job.findOne({
        client: req.user._id,
        service: req.body.service
    });

    if (job) {
        // Throw a 400 error if a service has already been requested for this client
        const error = new Error('Validation Error');
        error.statusCode = 400;
        error.errors = { message: "You have already requested this service"};
        return next(error);
    }

    try {
        const newJob = new Job({
            service: req.body.service,
            client: req.user._id,
            statusDescription: req.body.statusDescription,
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
    } catch(err) {
        next(err);
    }
});

// update fields for a single job
router.patch('/:id', requireUser, validateJobInput, async (req, res, next) => {
    try {
        const filter = { _id: req.params.id };
        const update = {
            service: req.body.service,
            client: req.body.client,
            statusDescription: req.body.statusDescription,
            date: req.body.date,
            description: req.body.description
        }
        let job = await Job.findOneAndUpdate(filter, update, {
            new: true
        });
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
    } catch(err) {
        const error = new Error('Job could not be updated');
        error.statusCode = 404;
        error.errors = { message: "Job could not be updated"};
        return next(error);
    }
});

// delete a single job with an id
router.delete('/:id', requireUser, async (req, res, next) => {
    try {
        const filter = { _id: req.params.id };
        let job = await Job.findOneAndDelete(filter);
        return res.json(job);
    } catch(err) {
        const error = new Error('Job could not be deleted');
        error.statusCode = 404;
        error.errors = { message: "Job could not be deleted"};
        return next(error);
    }
})

module.exports = router;
