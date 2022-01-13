const mongoose = require('mongoose');
const validator = require('validator').default;

const Channel = require('./channel.model');
const Schema = mongoose.Schema;

const schema = new Schema({
    fieldName: String,
    channelId: String,
    value: Number,
}, { timestamps: true });

schema.statics.push = async (fieldName, value, channelId) => {
    const channel = await Channel.findOne({ channelId });

    if (!channel) {
        throw new Error('invalid channel id');
    }

    /* if (!validator.isNumeric(value)) {
        throw new Error('given value is not numerical');
    } */

    const data = new Data({
        fieldName, value, channelId
    });

    await data.save();

    return data;
};

const Data = mongoose.model('Data', schema);

module.exports = Data;