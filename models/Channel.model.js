const mongoose = require("mongoose");
const uniqid = require("uniqid");
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		title: String,
		description: String,
		image: String,
		fields: [
			{
				label: String,
				dataType: String,
				filterId: mongoose.Types.ObjectId,
				summary: {
					count: Number,
					range: {
						min: Number,
						max: Number,
					},
					quartiles: [Number],
					median: Number,
					mean: Number,
					mode: Number,
					stdev: Number,
					variance: Number,
				},
			},
		],
		keys: {
			r: mongoose.Types.ObjectId,
			w: mongoose.Types.ObjectId,
		},
		dataRate: String,
		nextWindowTime: Date,
		ownerId: mongoose.Types.ObjectId,
		uniqueId: String,
        visible: Boolean,
	},
	{ timestamps: true }
);

schema.statics.isIdUnique = async (id) => {
	const channel = await Channel.findOne({ uniqueId: id });

	return !channel;
};

schema.statics.setVisibility = async (channelId, flag) => {
    const channel = await Channel.findById(channelId);

    if (!channel) {
        throw new Error('invalid channel id');
    }

    channel.visible = flag;

    await channel.save();

    return channel;
};

schema.statics.getVisibility = async (channelId) => {
    const channel = await Channel.findById(channelId);

    
    if (!channel) {
        return false;
    }
    
    // if channel.visible is null, then it is visible
    // initalize to true before returning
    if (channel.visible === undefined) {
        channel.visible = true;
        
        await channel.save();
    }

    return channel.visible;
};

schema.methods.updateNextWindowTime = async function () {
	const channel = this;

	// default increment is 30s
	// if dataRate === '1m' increment is 1m
	// if dataRate === '5m' increment is 5m
	// if dataRate === '30m' increment is 30m
	// if dataRate === '1h' increment is 1h
	// if dataRate === '1d' increment is 1d
	// if dataRate === '1w' increment is 1w
	// if dataRate === '1mo' increment is 1mo
	let increment = 30 * 1000;

	switch (channel.dataRate) {
		case "1m":
			increment = 60 * 1000;
			break;
		case "5m":
			increment = 5 * 60 * 1000;
			break;
		case "30m":
			increment = 30 * 60 * 1000;
			break;
		case "1h":
			increment = 60 * 60 * 1000;
			break;
		case "1d":
			increment = 24 * 60 * 60 * 1000;
			break;
		case "1w":
			increment = 7 * 24 * 60 * 60 * 1000;
			break;
		case "1mo":
			increment = 30 * 24 * 60 * 60 * 1000;
			break;
	}

	channel.nextWindowTime = new Date(Date.now() + increment);

	await channel.save();

	return channel;
};

schema.methods.isWindowOpen = async function () {
	const channel = this;

	// if Date.now() > channel.nextWindowTime, then window is open
	return Date.now() > (channel.nextWindowTime || 0);
};

schema.statics.add = async (title, description, fields, dataRate, ownerId) => {
	try {
		let increment = 30 * 1000;

		switch (channel.dataRate) {
			case "1m":
				increment = 60 * 1000;
				break;
			case "5m":
				increment = 5 * 60 * 1000;
				break;
			case "30m":
				increment = 30 * 60 * 1000;
				break;
			case "1h":
				increment = 60 * 60 * 1000;
				break;
			case "1d":
				increment = 24 * 60 * 60 * 1000;
				break;
			case "1w":
				increment = 7 * 24 * 60 * 60 * 1000;
				break;
			case "1mo":
				increment = 30 * 24 * 60 * 60 * 1000;
				break;
		}

		const uniqueId = uniqid();
		const channel = new Channel({
			title,
			description,
			image: "",
			fields: fields.map((field) => ({
				label: field.label,
				dataType: field.type,
			})),
			ownerId,
			uniqueId,
            dataRate: dataRate || "1m",
            nextWindowTime: new Date(Date.now() + increment),
		});

		await channel.save();

		return channel;
	} catch (e) {
		throw new Error(e);
	}
};

schema.statics.assignFilters = async (channelId, fields) => {
	const channel = await Channel.findById(channelId);

	if (!channel) {
		throw new Error("Channel not found");

		return;
	}

	channel.fields.forEach((field) => {
		const fieldToUpdate = fields.find((q) => q.field === field.label);

		if (fieldToUpdate) {
			if (mongoose.Types.ObjectId.isValid(fieldToUpdate.filterId)) {
				field.filterId = mongoose.Types.ObjectId(
					fieldToUpdate.filterId
				);
			} else {
				field.filterId = null;
			}
		}
	});

	await channel.save();

	return channel;
};

schema.methods.addField = async function (label) {
	const labelExists = this.fields.find((q) => q.label === label);

	if (labelExists) {
		throw new Error("label already exists");
	}

	this.fields.push({
		label,
		summary: {
			count: 0,
			range: {
				min: 0,
				max: 0,
			},
			quartiles: [],
			median: 0,
			mean: 0,
			mode: 0,
			stdev: 0,
			variance: 0,
		},
	});

	await this.save();

	return this;
};

schema.methods.removeField = async (label) => {
	if (this.fields.length === 0) {
		throw new Error("field label not found");
	}

	const field = this.fields.find((q) => q.label === label);

	if (!field) {
		throw new Error("field label not found");
	}

	this.fields.splice(this.fields.indexOf(field), 1);
};

schema.methods.updateKeys = async function (keys) {
	this.keys = keys;

	await this.save();

	return this;
};

const Channel = mongoose.model("Channel", schema);

module.exports = Channel;
