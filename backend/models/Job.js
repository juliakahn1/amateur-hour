const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    statusDescription: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }, 
    description: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);