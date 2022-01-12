const mongoose = require('mongoose');

const Key = mongoose.model('Key');

const verifyKey = async key => {
    const result = await Key.verify(key);

    return result;
};

module.exports = {
    create: async (label, username, id) => {
        const key = await Key.createKey(label, username, id);

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
    getOwned: async (req, res) => {
        try {
            const { id } = req.payload;
           
            const keys = (await Key.find({ ownerId: id})).map(key => ({
                id: key._id,
                pass: `${key.ref}.${key.getKey()}`,
                label: key.label,
                createdAt: key.createdAt,
            }));

            res.status(200).json(keys);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    rename: async (id, label) => {
        const key = await Key.rename(id, label);

        return key;
    },
    
    delete: async (req, res) => {
        try {
            await Key.delete(req.params.id);

            res.status(200).json({ message: 'Key deleted' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    addChannel: async (id, channel) => {
        const key = await Key.findById(id);
        key.channels.push(channel);
        await key.save();
    },
};