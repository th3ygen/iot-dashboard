const mongoose = require('mongoose');
const Data = mongoose.model('Data');

module.exports = {
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
