const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    fields: [{
        label: String,
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
}, { timestamps: true });

mongoose.model('Channel', schema);