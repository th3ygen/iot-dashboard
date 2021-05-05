const mongoose = require('mongoose');
const validator = require('validator').default;

const Channel = require('./channel.model');
const Schema = mongoose.Schema;

const schema = new Schema({
    label: String,
    value: Number,
    channelId: mongoose.Types.ObjectId
}, { timestamps: true });

schema.statics.push = async (channelId, label, value) => {
    const channel = await Channel.findOne({ uniqueId: channelId });

    if (!channel) {
        throw new Error('invalid channel id');
    }

    if (!validator.isNumeric(value)) {
        throw new Error('given value is not numerical');
    }

    const data = new Data({
        label, value, channelId
    });

    await data.save();

    return data;
};

const Data = mongoose.model('Data', schema);

module.exports = Data;