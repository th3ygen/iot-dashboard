const mongoose = require('mongoose');

const Key = mongoose.model('Key');

module.exports = {
    create: async id => {
        const key = await Key.createKey(id);

        return key.getKey();
    },
    getKeys: async id => {
        const keys = await Key.find({ ownerId: id});
        return keys.map(key => ({
            pass: key.getKey(),
            channels: key.channels
        }));
    },
    addChannel: async (id, channel) => {
        const key = await Key.findById(id);
        key.channels.push(channel);
        await key.save();
    },
};