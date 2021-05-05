const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    keys: [{
        label: String,
        value: String
    }],
    channelId: mongoose.Types.ObjectId
}, { timestamps: true });

const Key = mongoose.model('Key', schema);

module.exports = Key;