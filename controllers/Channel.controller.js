const mongoose = require('mongoose');
const helper = require('../helpers/basic.helper');

const Channel = mongoose.model('Channel');

module.exports = {
create: async (req, res) => {
        try {
            const { title } = req.query;

            const channel = await Channel.add(req.token.id, title);

            res.status(200).json({
                channel
            });
        } catch (e) {
            helper.log(e, 'ROUTE: /api/channel/add', 'red');
            res.status(500).json({
                msg: e
            });
        }
    }
};
