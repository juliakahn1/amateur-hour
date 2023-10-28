const compOptions = [
    'Yelp review',
    'Google review',
    'Instagram post and tag'
]
const serviceCategories = [
    'photography',
    'gardening',
    'art',
    'modeling',
    'cleaning',
    'bartending',
    'dj',
    'moving',
    'videography',
    'decorating'
]

const statusOptions = [
    'requested',
    'accepted',
    'providerCompleted',
    'clientCompleted',
    'providerCompensated'
]

/// NOTE: locations are hardcoded in component 'frontend/src/components/SessionForms/SignupForm.js'. Update there if needed.
const locationOptions = [
    'California Bay Area',
    'Southern California',
    'Chicagoland'
]

const requestedJobStatuses = {
    'requested': 'Awaiting provider acceptance',
    'accepted': 'Awaiting provider completion',
    'providerCompleted': 'Job completed?',
    'clientCompleted': 'Compensation given?',
    'providerCompensated': 'Request complete'
}

const providedJobStatuses = {
    'requested': 'Accept job?',
    'accepted': 'Job completed?',
    'providerCompleted': 'Awaiting client confirmation',
    'clientCompleted': 'Awaiting client compensation',
    'providerCompensated': 'Job complete'
}


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

module.exports = {
    compOptions,
    serviceCategories,
    statusOptions,
    locationOptions,
    requestedJobStatuses,
    providedJobStatuses,
    jobDescriptionOptions
}
