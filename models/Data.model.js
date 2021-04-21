const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    label: String,
    value: Number,
    channelId: mongoose.Types.ObjectId
}, { timestamps: true });

mongoose.model('Data', schema);