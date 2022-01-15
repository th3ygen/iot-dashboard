const mongoose = require("mongoose");
const helper = require("../helpers/basic.helper");
const PrettyError = require("pretty-error");

const pe = new PrettyError();

const Channel = require("../models/channel.model");
const Data = require("../models/data.model");
const User = require("../models/user.model");
const Comment = require("../models/Comment.model");

module.exports = {
	getOwned: async (req, res) => {
		try {
			const channels = await Channel.find({ ownerId: req.payload.id });

			return res.status(200).json({
				channels,
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
			const channel = await Channel.setVisibility(
				req.params.id,
				req.body.flag
			);

			return res.status(200).json(channel);
		} catch (e) {
			helper.log(
				pe.render(e),
				"ROUTE: /api/channel/setVisibility",
				"red"
			);
			res.status(500).json({
				msg: e,
			});
		}
	},
	getVisibility: async (req, res) => {
		try {
			const flag = await Channel.getVisibility(req.params.id);

			return res.status(200).json({
				flag,
			});
		} catch (e) {
			helper.log(
				pe.render(e),
				"ROUTE: /api/channel/getVisibility",
				"red"
			);
			res.status(500).json({
				msg: e,
			});
		}
	},
	getPublic: async (req, res) => {
		try {
			// get channel by id
			// with the owner username
			// using aggregation

			let channel;

			// check id is object id
			if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
				channel = await Channel.aggregate([
					{
						$match: {
							uniqueId: req.params.id,
						},
					},
					{
						$lookup: {
							from: "users",
							localField: "ownerId",
							foreignField: "_id",

							as: "owner",
						},
					},
					{
						$unwind: "$owner",
					},
				]).limit(1);
			} else {
				channel = await Channel.aggregate([
					{
						$match: {
							_id: mongoose.Types.ObjectId(req.params.id),
						},
					},
					{
						$lookup: {
							from: "users",
							localField: "ownerId",
							foreignField: "_id",

							as: "owner",
						},
					},
					{
						$unwind: "$owner",
					},
				]).limit(1);
			}

			if (!channel[0]) {
				return res.status(404).json({
					msg: "channel not found",
				});
			}

			// count total data added in 1 day
			const data = await Data.find({
				channelId: channel[0]._id,
				createdAt: {
					$gte: new Date(
						new Date().setDate(
							new Date().getDate() - 1000 * 60 * 60 * 24
						)
					),
				},
			});

			channel[0].dataPerDay = data.length;

			return res.status(200).json(channel[0]);
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

			const o = [];

			for (let channel of channels) {
				const totalComments = await Comment.countDocuments({
					channelId: channel._id,
				});

				const totalLikes = await User.countDocuments({
					likedChannels: {
						$in: [channel._id],
					},
				});

				o.push({
					id: channel.uniqueId,
					title: channel.title,
					description: channel.description,
					image: channel.image,
					views: channel.views,
					likes: totalLikes,
					comments: totalComments,
				});
			}

			return res.status(200).json(o);
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
				channel,
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

			let channel;

			// check if id is a channel id
			if (mongoose.Types.ObjectId.isValid(id)) {
				channel = await Channel.findById(id);
			} else {
				channel = await Channel.findOne({ uniqueId: id });
			}

			if (!channel) {
				return res.status(404).json({
					msg: "Channel not found",
				});
			}

			const data = {};

			for (let field of channel.fields) {
				// get last 15 data
				// for the current day
				const lastData = await Data.find({
					channelId: channel._id,
					fieldName: field.label,
					createdAt: {
						$gte: new Date(
							new Date().setDate(new Date().getDate() - 1)
						),
					},
				})
					.sort({
						createdAt: -1,
					})
					.limit(15);

				data[field.label] = lastData.map((d) => ({
					value: d.value,
					date: new Date(d.createdAt).getTime(),
				}));
				data[field.label].sort((a, b) => a.date - b.date);
			}

			return res.status(200).json({
				id: channel.uniqueId,
				data,
			});
		} catch (e) {
			helper.log(
				pe.render(e),
				"ROUTE: /api/channel/getFieldsData",
				"red"
			);
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

			const channel = await Channel.add(
				title,
				description,
				fields,
				req.payload.id
			);

			res.status(200).json({
				channel,
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
				fields: fields.map((field) => ({
					label: field.label,
					dataType: field.dataType,
					filterId: field.filterId || null,
				})),
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
					msg: "valid",
					id,
				});
			}

			res.status(402).json({
				msg: "invalid",
				id,
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
					msg: "channel not found",
				});
			}

			if (typeof label !== "string") {
				return res.status(404).json({
					msg: "label must be string",
				});
			}

			await channel.addField(label);

			res.status(200).json({
				msg: `field ${label} added`,
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
					msg: "channel not found",
				});
			}

			keys = {
				r: keys.r,
				w: keys.w,
			};

			await channel.updateKeys(keys);

			res.status(200).json({
				msg: `keys added`,
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
					msg: "channel not found",
				});
			}

			await channel.delete();

			res.status(200).json({
				msg: "channel deleted",
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
				msg: "filters assigned",
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/assignFilters", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	addView: async (req, res) => {
		try {
			const { id } = req.params;

			const channel = await Channel.findOne({ uniqueId: id });

			if (!channel) {
				return res.status(404).json({
					msg: "channel not found",
				});
			}

			await channel.addView();

			res.status(200).json({
				msg: "view added",
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/addView", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	like: async (req, res) => {
		try {
			const { id } = req.params;

			const channel = await Channel.findOne({ uniqueId: id });

			if (!channel) {
				return res.status(404).json({
					msg: "channel not found",
				});
			}

			// check if user has already liked the channel
			const user = await User.findById(req.payload.id);

			if (user.likedChannels.includes(channel._id)) {
				// remove the like
				user.likedChannels.splice(
					user.likedChannels.indexOf(channel._id),
					1
				);

				await user.save();

				return res.status(200).json({
					inc: -1,
				});
			}

			await user.likeChannel(channel._id);

			res.status(200).json({
				inc: 1,
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/like", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	getTotalLikes: async (req, res) => {
		try {
			const { id } = req.params;

			let channel;

			// check if id is object id
			if (mongoose.Types.ObjectId.isValid(id)) {
				channel = await Channel.findById(id);
			} else {
				channel = await Channel.findOne({ uniqueId: id });
			}

			if (!channel) {
				return res.status(404).json({
					msg: "channel not found",
				});
			}

			// count all users with likedChannels.includes(id)
			const count = await User.countDocuments({
				likedChannels: {
					$in: [channel._id],
				},
			});

			res.status(200).json({
				msg: "total likes",
				totalLikes: count,
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/getTotalLikes", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	addComment: async (req, res) => {
		try {
			const { id } = req.params;

			let channel;

			if (mongoose.Types.ObjectId.isValid(id)) {
				channel = await Channel.findById(id);
			} else {
				channel = await Channel.findOne({ uniqueId: id });
			}
			
			if (!channel) {
				return res.status(404).json({
					msg: "channel not found",
				});
			}

			const { comment } = req.body;

			await new Comment({
				commentorId: req.payload.id,
				comment,
				replyTo: null,
				channelId: channel._id,
			}).save();

			res.status(200).json({
				msg: "comment added",
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/addComment", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	deleteComment: async (req, res) => {
		try {
			const { id } = req.params;

			const comment = await Comment.findById(id);

			if (!comment) {
				return res.status(404).json({
					msg: "comment not found",
				});
			}

			await comment.delete();

			res.status(200).json({
				msg: "comment deleted",
			});
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/deleteComment", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
	getComments: async (req, res) => {
		try {
			const { id } = req.params;

			let channel;

			if (mongoose.Types.ObjectId.isValid(id)) {
				channel = await Channel.findById(id);
			} else {
				channel = await Channel.findOne({ uniqueId: id });
			}


			if (!channel) {
				return res.status(404).json({
					msg: "channel not found",
				});
			}

			// get comments with User username
			// using aggregation
			const comments = await Comment.aggregate([
				{
					$match: {
						channelId: channel._id,
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "commentorId",
						foreignField: "_id",
						as: "commentor",
					},
				},
				{
					$unwind: "$commentor",
				},
				{
					$project: {
						comment: 1,
						createdAt: 1,
						commentor: {
							_id: 1,
							username: 1,
						},
					},
				},
			]);

			res.status(200).json(comments);
		} catch (e) {
			helper.log(e, "ROUTE: /api/channel/getComments", "red");
			res.status(500).json({
				msg: e,
			});
		}
	},
};
