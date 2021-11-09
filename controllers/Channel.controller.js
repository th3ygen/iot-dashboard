const mongoose = require("mongoose");
const helper = require("../helpers/basic.helper");

const Channel = mongoose.model("Channel");

module.exports = {
	getOwned: async (req, res) => {
		try {
			const channels = await Channel.find({ ownerId: req.token.id });

			return res.status(200).json({
				channels
			});
		} catch (e) {
			helper.log(e.stack, "ROUTE: /api/channel/getOwned", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	create: async (req, res) => {
		try {
			const { id, title, description, field, fieldDesc } = req.body;
			
			// validate id
			const isValid = await Channel.isIdUnique(id);
			
			if (!isValid) {
				return res.status(402).json({
					msg: "id already taken",
				});
			}
			
			console.log(id);
			const channel = await Channel.add(title, req.token.id, id, description, field, fieldDesc);

			res.status(200).json({
				channel
			});
		} catch (e) {
			helper.log(e.stack, "ROUTE: /api/channel/create", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	validateId: async (req, res) => {
		try {
			const { id } = req.query;

			const isValid = await Channel.isIdUnique(id);

			if (isValid) {
				return res.status(200).json({
					msg: 'valid',
					id
				});
			}

			res.status(402).json({
				msg: 'invalid',
				id
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/validateid", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	addField: async (req, res) => {
		try {
			const { id, label } = req.body;

			const channel = await Channel.findOne({ channelId: id });

			if (!channel) {
				return res.status(404).json({
					msg: 'channel not found'
				});
			}

			if (typeof label !== 'string') {
				return res.status(404).json({
					msg: 'label must be string'
				});
			}

			await channel.addField(label);

			res.status(200).json({
				msg: `field ${label} added`
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/addfield", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
};
