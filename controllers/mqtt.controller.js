const mongoose = require('mongoose');
const Data = mongoose.model('Data');
const Channel = mongoose.model('Channel');

module.exports = {
    validate: {
        // must have label as String, value as Number
        payload: payload => typeof payload.fieldName === 'string' && typeof payload.value === 'number',
    
        // is give channel id exists
        isChannelExists: async channelId => {
            const channel = await Channel.findOne({ channelId });
    
            return !channel ? '' : channelId;
        }
    },

    feed: async (fieldName, value, channelId) => {
        try {
            Data.push(fieldName, value, channelId);
        } catch (e) {
            res.status(500).json({
                msg: e
            });
        }
    },

    push: async (req, res) => {
        try {
            const { channelId } = req.params;
            const { label, value } = req.body;

            const data = await Data.push(channelId, label, value);

            res.status(200).json({
                data
            });
        } catch (e) {
            res.status(500).json({
                msg: e
            });
        }
    }
};
