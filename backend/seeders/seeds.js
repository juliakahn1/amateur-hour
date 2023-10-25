const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys');
const User = require('../models/User');
const Service = require('../models/Service');
const Job = require('../models/Job');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const { compOptions, serviceCategories, statusOptions } = require("../../frontend/src/constants");

const NUM_SEED_USERS = 15;
const NUM_SEED_SERVICES = 15;
const NUM_SEED_JOBS_PER_SERVICE = 3;

// create users
const users = [];

users.push(
    new User({
        firstName: 'Mitchell',
        lastName: 'Chan',
        email: 'mitchell@chan.io',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
);

users.push(
    new User({
        firstName: 'Davis',
        lastName: 'Lucky',
        email: 'davis@lucky.io',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
);

users.push(
    new User({
        firstName: 'Shannon',
        lastName: 'Millar',
        email: 'shannon@millar.io',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
);

users.push(
    new User({
        firstName: 'Julia',
        lastName: 'Khan',
        email: 'julia@khan.io',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
);

for (let i = 3; i < NUM_SEED_USERS; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    users.push(
        new User({
            firstName,
            lastName,
            email: faker.internet.email( {firstName, lastName} ),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
        })
    )
}

// create services
const services = [];

for (let i = 0; i < NUM_SEED_SERVICES; i++) {
    services.push(
        new Service({
            category: serviceCategories[Math.floor(Math.random() * serviceCategories.length)],
            provider: users[i]._id,
            compensation: compOptions[Math.floor(Math.random() * compOptions.length)]
        })
    )
}

// create jobs
const jobs = [];

services.forEach(service=> {
    for (let i = 0; i < NUM_SEED_JOBS_PER_SERVICE; i++) {
        jobs.push(
            new Job({
                service: service._id, 
                client: users[Math.floor(Math.random() * users.length)],
                statusDescription: statusOptions[Math.floor(Math.random() * statusOptions.length)],
                date: faker.date.soon(),
                description: faker.person.bio()
            })
        )
    }
})
    

// Connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });

const insertSeeds = () => {
    console.log("Resetting db and seeding users and services...");

    User.collection.drop()
        .then(() => Service.collection.drop())
        .then(() => Job.collection.drop())
        .then(() => User.insertMany(users))
        .then(() => Service.insertMany(services))
        .then(() => Job.insertMany(jobs))
        .then(() => {
            console.log("Done!");
            mongoose.disconnect();
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
}