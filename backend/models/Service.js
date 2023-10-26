const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    compensation: {
        type: String,
        required: true
    },
    instagramLink: {
        type: String
    },
    yelpLink: {
        type: String
    },
    otherLink: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
