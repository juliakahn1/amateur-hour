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

/// NOTE: locations are hardcoded in component 'frontend/src/components/SessionForms/SignupForm.js'. Update there if needed.
const locationOptions = [
    'California Bay Area',
    'Southern California',
    'Chicagoland'
]

module.exports = { compOptions, serviceCategories, statusOptions, locationOptions }
