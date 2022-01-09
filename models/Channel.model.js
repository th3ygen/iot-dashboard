const mongoose = require('mongoose');
const uniqid = require('uniqid')
const Schema = mongoose.Schema;

const schema = new Schema({
    title: String,
    channelId: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    fields: [{
        label: String,
        description: String,
        summary: {
            count: Number,
            range: {
                min: Number,
                max: Number
            },
            quartiles: [Number],
            median: Number,
            mean: Number,
            mode: Number,
            stdev: Number,
            variance: Number
        }
    }],  
    
    ownerId: mongoose.Types.ObjectId,
    uniqueId: String
}, { timestamps: true });

schema.statics.isIdUnique = async id => {
    const channel = await Channel.findOne({ channelId: id });

    return !channel;
}

schema.statics.add = async (title, ownerId, channelId, description, field, fieldDesc) => {
    try {
        const uniqueId = uniqid();
        const channel = new Channel({
            title,
            channelId,
            description,
            image: '',
            fields: [{
                label: field,
                description: fieldDesc
            }],
            ownerId,
            uniqueId
        });

        await channel.save();

        return channel;
    } catch (e) {
        throw new Error(e);
    }
};

schema.methods.addField = async function(label) {
    const labelExists = this.fields.find(q => (q.label === label));

    if (labelExists) {
        throw new Error('label already exists');
    }

    this.fields.push({
        label,
        summary: {
            count: 0,
            range: {
                min: 0,
                max: 0
            },
            quartiles: [],
            median: 0,
            mean: 0,
            mode: 0,
            stdev: 0,
            variance: 0
        }
    });

    this.save();
};

schema.methods.removeField = async label => {
    if (this.fields.length === 0) {
        throw new Error('field label not found');
    }

    const field = this.fields.find(q => (q.label === label));

    if (!field) {
        throw new Error('field label not found');
    }

    this.fields.splice(this.fields.indexOf(field), 1);
};

const Channel = mongoose.model('Channel', schema);

module.exports = Channel;