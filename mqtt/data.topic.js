const mongoose = require("mongoose");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Parser } = require("expr-eval");

const Channel = mongoose.model("Channel");
const Webhook = mongoose.model("Webhook");
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
			if (!isWindowOpen) {
				console.log(
					"window is closed, time left is",
					channel.nextWindowTime - Date.now()
				);
				return;
			}

			if (channel.keys.w) {
				if (!data.key) {
					return;
				}
	
				const key = await Key.verify(data.key);
	
				if (!key) {
					return;
				}
	
				if (!mongoose.Types.ObjectId(channel.keys.w).equals(key)) {
					return;
				}
	
				delete data.key;
			}
			

			let isUpdated = false;
			for (let field of channel.fields) {
				value = data[field.label];

				if (!field.filterId) {
					continue;
				}

				const filter = await Filter.findById(field.filterId);

				// if the channel have any filter assigned to it
				// run the filter expression to the data
				if (filter) {
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
						value = expression.evaluate(variables);

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
					}
				}

				if (value) {
					const newData = new Data({
						channelId: channel._id,
						fieldName: field.label,
						value,
					});

					await newData.save();

					isUpdated = true;
					client.publish(
						`iot-dash/${channel.uniqueId}/${field.label}/update`,
						JSON.stringify({
							channel: channel.title,
							field: field.label,
							value,
							date: new Date(Date.now()).getTime(),
						})
					);

					// send webhook
					const webhooks = await Webhook.find({
						channelId: channel._id,
					});

					for (let webhook of webhooks) {
						if (webhook.active) {
							const parser = new Parser();

							const expression = parser.parse(webhook.trigger);

							const variables = expression.variables();

							if (variables.length === 0) {
								continue;
							}

							if (variables[0] === field.label) {
								const trigger = expression.evaluate({
									[field.label]: value,
								});

								if (trigger) {
									// convert payload (JSON string) to query string
									const payload = JSON.parse(webhook.payload);
									const query = Object.keys(payload)
										.map(key => `${key}=${payload[key]}`)
										.join("&");

									// make a request to the webhook
									fetch(webhook.url + '?' + query, {
										method: "GET",
										headers: {
											"Content-Type": "application/json",
										},
									}).then(res => {
										webhook.lastStatus = res.status;
										
										return res.json();
									}).then(json => {
										webhook.lastRequestMessage = json.description || json.toString();

										webhook.save();
									}).catch(err => {
										webhook.lastStatus = "500";
										webhook.lastRequestMessage = err.message;

										webhook.save();
									});

									client.publish(
										`iot-dash/${channel.uniqueId}/${field.label}/webhook`,
										JSON.stringify({
											label: webhook.label,
											field: field.label,
											value: "Webhook triggered",
											date: new Date(Date.now()).getTime(),
										})
									);
								}
							}
						}
					}
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
