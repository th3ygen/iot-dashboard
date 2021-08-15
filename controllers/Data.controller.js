const mongoose = require('mongoose');

const Data = mongoose.model('Data');

module.exports = {
    findByChannelId: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(402).json({
                    msg: 'no channel id provided'
                });
            }

            const data = await Data.find({ channelId: id });

            res.status(200).json({
                data
            });
        } catch (e) {
			helper.log(e, "ROUTE: /data/get", "red");
			res.status(500).json({
				msg: e
			});
		}
    }
}