const mongoose = require('mongoose');
const uniqid = require('uniqid')
const Schema = mongoose.Schema;

const schema = new Schema({
    title: String,
    /* channelId: {
        type: String,
        required: true
    }, */
    description: String,
    image: String,
    fields: [{
        label: String,
        dataType: String,
        filterId: mongoose.Types.ObjectId,
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
    keys: {
        r: mongoose.Types.ObjectId,
        w: mongoose.Types.ObjectId,
    },
    ownerId: mongoose.Types.ObjectId,
    uniqueId: String
}, { timestamps: true });

schema.statics.isIdUnique = async id => {
    const channel = await Channel.findOne({ channelId: id });

    return !channel;
}

schema.statics.add = async (title, description, fields, ownerId) => {
    try {
        console.log({
            title,
            description,
            image: '',
            fields: fields.map(field => (
                {
                    label: field.label,
                    type: field.type,
                }
            )),
            ownerId,
        });
        const uniqueId = uniqid();
        const channel = new Channel({
            title,
            description,
            image: '',
            fields: fields.map(field => (
                {
                    label: field.label,
                    dataType: field.type,
                }
            )),
            ownerId,
            uniqueId
        });


        await channel.save();

        return channel;
    } catch (e) {
        throw new Error(e);
    }
};

schema.statics.assignFilters = async (channelId, fields) => {
    const channel = await Channel.findById(channelId);

    if (!channel) {
        throw new Error('Channel not found');

        return;
    }

    channel.fields.forEach(field => {
        const fieldToUpdate = fields.find(q => (q.field === field.label));

        if (fieldToUpdate) {
            if (mongoose.Types.ObjectId.isValid(fieldToUpdate.filterId)) {
                field.filterId = mongoose.Types.ObjectId(fieldToUpdate.filterId);
            } else {
                field.filterId = null;
            }
        }
    });

    await channel.save();

    return channel;
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

    await this.save();

    return this;
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

schema.methods.updateKeys = async function(keys) {
    this.keys = keys;

    await this.save();

    return this;
};

const Channel = mongoose.model('Channel', schema);

module.exports = Channel;