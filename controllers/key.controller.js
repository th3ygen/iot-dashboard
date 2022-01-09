const mongoose = require('mongoose');

const Key = mongoose.model('Key');

const verifyKey = async key => {
    const result = await Key.verify(key);

    return result;
};

module.exports = {
    create: async (username, id) => {
        const key = await Key.createKey(username, id);

        return key;
    },
    test: async key => {
        const result = await verifyKey(key);

        return result;
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