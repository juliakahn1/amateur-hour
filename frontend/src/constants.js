const compOptions = [
    'Yelp review',
    'Google review',
    'Instagram post and tag account'
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

module.exports = {
    compOptions,
    serviceCategories,
    statusOptions,
    requestedJobStatuses,
    providedJobStatuses
}
