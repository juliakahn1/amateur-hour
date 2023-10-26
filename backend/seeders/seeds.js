const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys");
const User = require("../models/User");
const Service = require("../models/Service");
const Job = require("../models/Job");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const {
    compOptions,
    serviceCategories,
    statusOptions,
    locationOptions,
} = require("../../frontend/src/constants");

const NUM_SEED_USERS = 90;
const NUM_SEED_SERVICES_PER_CATEGORY = 8;
const NUM_SEED_JOBS_PER_SERVICE = 8;

const jobDescriptionOptions = [
    "When's the soonest you're available?",
    "Love your stuff!",
    "Would love to chat. I sent you an email.",
    "Really cool work!",
    "Looking forward to meeting you.",
    "I'm surprised you haven't already made it big!",
    "I think we are a good match. Thanks for sharing your portfolio.",
    "I am flexible on dates, so feel free to suggest another day.",
    "I'll be going out of town in a few weeks FYI.",
    "I've reached out to a few people, but I think you're the best fit.",
    "Looking forward to chatting!",
    "Lovely stuff, hope to meet soon.",
    "When did you get started in the biz? Looks great!",
    "I just have a few questions before we move forward. I shot you an email!",
    "Exactly what I was looking for.",
    "Looks like you're a pro already!",
    "I've been looking for someone like you! Glad to see your portfolio.",
    "You sure you're an amateur?? Really cool stuff. Let's chat soon.",
    "Let me know ASAP please. I'm trying to squeeze it in before I leave town.",
    "Awesome work, keep it up!",
    "Love to see portfolios like this on Amateur Hour. Can't wait to speak.",
];

// create users
const users = [];

users.push(
    new User({
        firstName: "Mitchell",
        lastName: "Chan",
        email: "mitchell@chan.io",
        hashedPassword: bcrypt.hashSync("password", 10),
        location:
            locationOptions[Math.floor(Math.random() * locationOptions.length)],
    })
);

users.push(
    new User({
        firstName: "Davis",
        lastName: "Lucky",
        email: "davis@lucky.io",
        hashedPassword: bcrypt.hashSync("password", 10),
        location:
            locationOptions[Math.floor(Math.random() * locationOptions.length)],
    })
);

users.push(
    new User({
        firstName: "Shannon",
        lastName: "Millar",
        email: "shannon@millar.io",
        hashedPassword: bcrypt.hashSync("password", 10),
        location:
            locationOptions[Math.floor(Math.random() * locationOptions.length)],
    })
);

users.push(
    new User({
        firstName: "Julia",
        lastName: "Khan",
        email: "julia@khan.io",
        hashedPassword: bcrypt.hashSync("password", 10),
        location:
            locationOptions[Math.floor(Math.random() * locationOptions.length)],
    })
);

for (let i = 4; i < NUM_SEED_USERS; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    users.push(
        new User({
            firstName,
            lastName,
            email: faker.internet.email({ firstName, lastName }),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
            location:
                locationOptions[Math.floor(Math.random() * locationOptions.length)],
        })
    );
}

// create services
const services = [];
serviceCategories.forEach((selectedCategory, indexCategory) => {
    const numServices =
        NUM_SEED_SERVICES_PER_CATEGORY - Math.floor(Math.random() * 3);
    for (let i = 0; i < numServices; i++) {
        services.push(
            new Service({
                category: selectedCategory,
                provider: users[(i + 1) * (indexCategory + 1)]._id,
                compensation:
                    compOptions[Math.floor(Math.random() * compOptions.length)],
                otherLink: faker.internet.url(),
                //// UNCOMMENT TO USE IMAGES FROM AWS AND COMMENT REFERENCE TO LOCAL FILE
                imageUrl: "https://www.rrstar.com/gcdn/presto/2023/01/13/NRRS/87e5ea0c-c552-43a0-852e-5f3f5e95781c-RFD0113_Top_Bartender006.JPG?width=660&height=440&fit=crop&format=pjpg&auto=webp",
                // imageUrl:
                //   "https://amateur-hour-seeds.s3.us-west-1.amazonaws.com/" +
                //   selectedCategory +
                //   "_" +
                //   (i + 1) +
                //   ".jpg",
            })
        );
    }
});

// create jobs
const jobs = [];
services.forEach((service) => {
    const numJobs = NUM_SEED_JOBS_PER_SERVICE - Math.floor(Math.random() * 4);
    for (let i = 0; i < numJobs; i++) {
        let selectedClient = users[Math.floor(Math.random() * users.length)]._id;
        while (selectedClient === service.provider._id) {
            selectedClient = users[Math.floor(Math.random() * users.length)]._id;
        }

        const selectedStatus =
            statusOptions[Math.floor(Math.random() * statusOptions.length)];
        let selectedDate = faker.date.recent({ days: 10 });
        if (["requested", "accepted"].includes(selectedStatus)) {
            selectedDate = faker.date.soon({ days: 10 });
        }
        jobs.push(
            new Job({
                service: service._id,
                client: selectedClient,
                statusDescription: selectedStatus,
                date: selectedDate,
                description: faker.helpers.arrayElement(jobDescriptionOptions),
            })
        );
    }
});

// create services and jobs for demo user for testing
// add demo user
users.push(
    new User({
        firstName: "Demo",
        lastName: "User",
        email: "demo@user.io",
        hashedPassword: bcrypt.hashSync("password", 10),
        location:
            locationOptions[Math.floor(Math.random() * locationOptions.length)],
    })
);

// service by demo user
services.push(
    new Service({
        category: "gardening",
        provider: users[users.length - 1]._id,
        compensation: compOptions[Math.floor(Math.random() * compOptions.length)],
        otherLink:
            "https://www.laurensgardenservice.com/portfolio-of-gardens-and-plantings/",

        //// UNCOMMENT TO USE IMAGES FROM AWS AND COMMENT REFERENCE TO LOCAL FILE
        imageUrl: "https://www.homeadvisor.com/r/wp-content/uploads/2016/01/smiling-newly-hired-gardener.jpeg",
        // imageUrl: "https://amateur-hour-seeds.s3.us-west-1.amazonaws.com/gardening_9.jpg"
    })
);

// requests for our demo user
for (let i = 0; i < 5; i++) {
    let selectedStatus =
        statusOptions[Math.floor(Math.random() * statusOptions.length)];
    let selectedDate = faker.date.recent({ days: 10 });
    if (["requested", "accepted"].includes(selectedStatus)) {
        selectedDate = faker.date.soon({ days: 10 });
    }
    jobs.push(
        new Job({
            service: services[services.length - 1]._id,
            client: users[Math.floor(Math.random() * (users.length - 1)) + 1]._id,
            statusDescription: selectedStatus,
            date: selectedDate,
            description: faker.helpers.arrayElement(jobDescriptionOptions),
        })
    );

    selectedStatus =
        statusOptions[Math.floor(Math.random() * statusOptions.length)];
    selectedDate = faker.date.recent({ days: 10 });
    if (["requested", "accepted"].includes(selectedStatus)) {
        selectedDate = faker.date.soon({ days: 10 });
    }
    jobs.push(
        new Job({
            service: faker.helpers.arrayElement(services)._id,
            client: users[users.length - 1]._id,
            statusDescription: selectedStatus,
            date: selectedDate,
            description: faker.helpers.arrayElement(jobDescriptionOptions),
        })
    );
}

// Connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB successfully");
        insertSeeds();
    })
    .catch((err) => {
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
        .catch((err) => {
            console.error(err.stack);
            process.exit(1);
        });
};
