//required fields: scriptSequence, businessName, user.
const mongoose = require('mongoose');

const CallSchema = mongoose.Schema({
    customizationId: {
        //Later...
        type: mongoose.Schema.Types.ObjectId,
        ref: 'configurations',
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: 'other',

    },
    time: { type: Date, default: Date.now }
});

module.exports = Call = mongoose.model(
    'calls',
    CallSchema
);