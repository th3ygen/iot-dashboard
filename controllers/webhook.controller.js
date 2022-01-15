const mongoose = require("mongoose");
const helper = require("../helpers/basic.helper");
const PrettyError = require("pretty-error");

const pe = new PrettyError();

const Webhook = mongoose.model("Webhook");

module.exports = {
    create: async (req, res) => {
        try {
            const {
                label, url, channelId, payload, trigger
            } = req.body;

            const webhook = new Webhook({
                label, url, channelId, payload, trigger,
                ownerId: req.payload.id,
            });
            await webhook.save();
            res.status(200).json(webhook);
        } catch (err) {
            console.log(pe.render(err));
            res.status(500).send(err);
        }
    },
    update: async (req, res) => {
        try {
            const webhook = await Webhook.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(webhook);
        } catch (err) {
            console.log(pe.render(err));
            res.status(500).send(err);
        }
    },
    delete: async (req, res) => {
        try {
            const webhook = await Webhook.findByIdAndRemove(req.params.id);
            res.status(200).json(webhook);
        } catch (err) {
            console.log(pe.render(err));
            res.status(500).send(err);
        }
    },
    get: async (req, res) => {
        try {
            const webhook = await Webhook.findById(req.params.id);
            res.status(200).json(webhook);
        } catch (err) {
            console.log(pe.render(err));
            res.status(500).send(err);
        }
    },
    getAll: async (req, res) => {
        try {
            const webhooks = await Webhook.find();
            res.status(200).json(webhooks);
        } catch (err) {
            console.log(pe.render(err));
            res.status(500).send(err);
        }
    },
    getOwned: async (req, res) => {
        try {
            const webhooks = await Webhook.find({ owner: req.params.id });
            res.status(200).json(webhooks);
        } catch (err) {
            console.log(pe.render(err));
            res.status(500).send(err);
        }
    },
    toggleActive: async (req, res) => {
        try {
            const webhook = await Webhook.toggleActive(req.params.id);
            res.status(200).json(webhook);
        } catch (err) {
            console.log(pe.render(err));
            res.status(500).send(err);
        }
    }
}