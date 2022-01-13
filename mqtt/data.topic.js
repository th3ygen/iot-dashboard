const mongoose = require("mongoose");
const { Parser } = require("expr-eval");

const Channel = mongoose.model("Channel");
const Data = mongoose.model("Data");
const Filter = mongoose.model("Filter");
const Key = mongoose.model("Key");

module.exports = {
	write: async (id, data, client) => {
		try {
			const channel = await Channel.findOne({ uniqueId: id });

			if (!channel) {
				return;
			}

			// check window
			const isWindowOpen = await channel.isWindowOpen();
			/* if (!isWindowOpen) {
				console.log(
					"window is closed, time left is",
					channel.nextWindowTime - Date.now()
				);
				return;
			} */

			if (!data.key) {
				return;
			}

			const key = await Key.verify(data.key);

			if (!key) {
				return;
			}

			if (!mongoose.Types.ObjectId(channel.keys.w).equals(key._id)) {
				return;
			}

			delete data.key;

			let isUpdated = false;
			for (let field of channel.fields) {
				const filter = await Filter.findById(field.filterId);

				if (!filter) {
					continue;
				}

				const parser = new Parser();

				const expression = parser.parse(filter.expression);

				const variables = {};
				let hasVariable = true;

				for (let variable of expression.variables()) {
					const dt = await Data.findOne({
						channelId: channel._id,
						fieldName: field.label,
					})
						.sort({ createdAt: -1 })
						.limit(1);

					if (data[variable] || dt) {
						variables[variable] = data[variable] || dt.value;
					} else {
						hasVariable = false;
						break;
					}
				}

				if (hasVariable) {
					const value = expression.evaluate(variables);

					if (typeof value === NaN) {
						continue;
					}

					const { dataType } = field;
					if (typeof value !== dataType) {
						// fix it
						if (
							dataType === "boolean" &&
							typeof value === "number"
						) {
							value = value === 1;
						}

						if (
							dataType === "number" &&
							typeof value === "boolean"
						) {
							value = value ? 1 : 0;
						}

						if (
							dataType === "string" &&
							typeof value === "number"
						) {
							value = value.toString();
						}

						if (
							dataType === "string" &&
							typeof value === "boolean"
						) {
							value = value ? "true" : "false";
						}

						if (
							dataType === "number" &&
							typeof value === "string"
						) {
							value = parseFloat(value);
						}

						if (
							dataType === "boolean" &&
							typeof value === "string"
						) {
							value = value === "true";
						}
					}

					const data = new Data({
						channelId: channel._id,
						fieldName: field.label,
						value,
					});

					await data.save();

                    
					isUpdated = true;
                    client.publish(`iot-dash/${channel.uniqueId}/${field.label}/update`, JSON.stringify({
                        value,
                        date: new Date(data.createdAt).getTime()
                    }));
				}
			}

			if (isUpdated) {

				// update next window time
				channel.updateNextWindowTime();
			}

			return;
		} catch (e) {
			console.log(e);
		}
	},
};
