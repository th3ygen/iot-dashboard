const mongoose = require('mongoose');
const validator = require('validator').default;

const Schema = mongoose.Schema;

const schema = new Schema({
    label: String,
    url: String,
    method: String,
    ownerId: mongoose.Types.ObjectId,
    channelId: mongoose.Types.ObjectId,
    payload: String,
    trigger: String,
    active: Boolean,
    lastStatus: String,
    lastRequestMessage: String,
}, { timestamps: true });

schema.statics.toggleActive = async function (id) {
    const webhook = await this.findById(id);

    if (!webhook) {
        throw new Error({
            label: `webhook.toggleActive from {id:${id}}`,
            msg: 'webhook not found',
        });

        return;
    }

    if (webhook.active === undefined) {
        webhook.active = false;
    }

    webhook.active = !webhook.active;

    await webhook.save();

    return webhook;
};

const Webhook = mongoose.model('Webhook', schema);

module.exports = Webhook;