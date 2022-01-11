const mongoose = require("mongoose");
const helper = require("../helpers/basic.helper");
const PrettyError = require("pretty-error");

const pe = new PrettyError();

const Channel = require('../models/channel.model');

module.exports = {
	getOwned: async (req, res) => {
		try {
			const channels = await Channel.find({ ownerId: req.payload.id });

			return res.status(200).json({
				channels
			});
		} catch (e) {
			helper.log(pe.render(e), "ROUTE: /api/channel/getOwned", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	getById: async (req, res) => {
		try {
			const { id } = req.params;

			const channel = await Channel.findById(id);

			return res.status(200).json({
				channel
			});
		} catch (e) {
			helper.log(pe.render(e), "ROUTE: /api/channel/getById", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	create: async (req, res) => {
		try {
			const { title, description, fields } = req.body;
			
			/* // validate id
			const isValid = await Channel.isIdUnique(id);
			
			if (!isValid) {
				return res.status(402).json({
					msg: "id already taken",
				});
			} */

			const channel = await Channel.add(title, description, fields, req.payload.id);

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
	updateKeys: async (req, res) => {
		try {
			let { id, keys } = req.body;

			const channel = await Channel.findById(id);

			if (!channel) {
				return res.status(404).json({
					msg: 'channel not found'
				});
			}

			keys = {
				r: keys.r,
				w: keys.w,
			};

			await channel.updateKeys(keys);

			res.status(200).json({
				msg: `keys added`
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/updateKey", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	delete: async (req, res) => {
		try {
			const { id } = req.params;

			const channel = await Channel.findById(id);

			if (!channel) {
				return res.status(404).json({
					msg: 'channel not found'
				});
			}

			await channel.delete();

			res.status(200).json({
				msg: 'channel deleted'
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/delete", "red");
			res.status(500).json({
				msg: e,
			});
		}
	}
};
