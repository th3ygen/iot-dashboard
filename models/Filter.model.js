const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    label: String,
    expression: String,
    fields: [String],
    testValues: [{
        label: String,
        value: String,
    }],
    ownerId: mongoose.Types.ObjectId,
}, { timestamps: true });

const Filter = mongoose.model('Filter', schema);

module.exports = Filter;