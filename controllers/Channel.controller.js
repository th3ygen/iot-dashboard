const mongoose = require("mongoose");
const helper = require("../helpers/basic.helper");
const PrettyError = require("pretty-error");

const pe = new PrettyError();

const Channel = require('../models/channel.model');
const Data = require('../models/data.model');

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
	setVisibility: async (req, res) => {
		try {
			const channel = await Channel.setVisibility(req.params.id, req.body.flag);

			return res.status(200).json(channel);
		} catch (e) {
			helper.log(pe.render(e), "ROUTE: /api/channel/setVisibility", "red");
			res.status(500).json({	
				msg: e,
			});
		}
	},
	getVisibility: async (req, res) => {
		try {
			const flag = await Channel.getVisibility(req.params.id);

			return res.status(200).json({
				flag
			});
		} catch (e) {
			helper.log(pe.render(e), "ROUTE: /api/channel/getVisibility", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	getPublic: async (req, res) => {
		try {
			const channel = await Channel.findOne({ uniqueId: req.params.id });

			return res.status(200).json(channel);
		} catch (e) {
			helper.log(pe.render(e), "ROUTE: /api/channel/getPublic", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	getAllPublic: async (req, res) => {
		try {
			// find only visible channels
			const channels = await Channel.find({ visible: true });

			return res.status(200).json(channels.map(channel => ({
				id: channel.uniqueId,
				title: channel.title,
				description: channel.description,
				image: channel.image,
				views: 0,
				likes: 0,
				comments: 0
			})));
		} catch (e) {
			helper.log(pe.render(e), "ROUTE: /api/channel/getAllPublic", "red");
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
	getFieldsData: async (req, res) => {
		try {
			const { id } = req.params;

			const channel = await Channel.findById(id);

			const data = {};

			for (let field of channel.fields) {
				// get last 15 data
				const lastData = await Data.find({
					channelId: id,
					fieldName: field.label,
				}).sort({
					createdAt: -1
				}).limit(15);

				data[field.label] = lastData.map(d => ({
					value: d.value,
					date: new Date(d.createdAt).getTime(),
				}));
				data[field.label].sort((a, b) => a.date - b.date);

			}

			return res.status(200).json({
				id: channel.uniqueId,
				data
			});

		} catch (e) {
			helper.log(pe.render(e), "ROUTE: /api/channel/getFieldsData", "red");
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
	update: async (req, res) => {
		try {
			const { title, description, fields } = req.body;

			const channel = await Channel.findByIdAndUpdate(req.params.id, {
				title,
				description,
				fields: fields.map(field => (
					{
						label: field.label,
						dataType: field.dataType,
						filterId: field.filterId || null,
					}
				))
			});

			return res.status(200).json(channel);
		} catch (e) {
			helper.log(pe.render(e), "ROUTE: /api/channel/update", "red");
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
	},
	assignFilters: async (req, res) => {
		try {
			const { id, filters } = req.body;

			await Channel.assignFilters(id, filters);

			res.status(200).json({
				msg: 'filters assigned'
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/assignFilters", "red");
			res.status(500).json({
				msg: e,
			});
		}
	}
};
