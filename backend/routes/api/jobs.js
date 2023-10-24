const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Job = mongoose.model('Job');
const { requireUser } = require('../../config/passport');
const validateJobInput = require('../../validations/jobs');
const Service = require('../../models/Service');

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

// router.post('/', requireUser, validateJobInput, async (req, res, next) => {

// })