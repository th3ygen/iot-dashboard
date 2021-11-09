const mongoose = require('mongoose');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const Schema = mongoose.Schema;
const _helper = require('../helpers/basic.helper');
const hat = require('hat');

const schema = new Schema({
    pass: String,
    ownerId: mongoose.Types.ObjectId,
    channels: [{
        id: mongoose.Types.ObjectId,
        role: Number
    }]
}, { timestamps: true });

schema.statics.createKey = async (ownerId) => {
    try {
        const key = new Key({
            ownerId,
            channels: []
        });

        const pass = hat();

        const k = CryptoJS.Rabbit.encrypt(pass, process.env.API_KEY_SECRET).toString();

        key['pass'] = k;

        await key.save();

        return key;
    } catch (e) {
        _helper.log(`Unable to create key: ${e.message}`, 'error', 'red');
    }
};

schema.statics.verify = async (pass) => {
    try {
        pass = CryptoJS.RAbbbit.decrypt(pass, process.env.API_KEY_SECRET).toString(CryptoJS.enc.Utf8);

        const key = await Key.findOne({ pass });

        if (key) {
            return true;
        }

        return false;
    } catch (e) {
        _helper.log(`Unable to verify key: ${e.message}`, 'error', 'red');
        return false;
    }
};

schema.methods.getKey = function() {
    try {
        return CryptoJS.Rabbit.decrypt(this.pass, process.env.API_KEY_SECRET).toString(CryptoJS.enc.Utf8);
    } catch (e) {
        _helper.log(`Unable to get key: ${e.message}`, 'error', 'red');
    }
};

schema.methods.addChannel = async function(channelId, role) {
    try {
        this.channels.push({
            id: channelId,
            role
        });

        await this.save();

        return this;
    } catch (e) {
        _helper.log(`Unable to add channel to key: ${e.message}`, 'error', 'red');
        return {};
    }
};

schema.methods.removeChannel = async function(channelId) {
    try {
        this.channels = this.channels.filter(channel => channel.id.toString() !== channelId.toString());

        await this.save();

        return this;
    } catch (e) {
        _helper.log(`Unable to remove channel from key: ${e.message}`, 'error', 'red');
        return {};
    }
};

schema.methods.delete = async function() {
    try {
        await this.remove();
    } catch (e) {
        _helper.log(`Unable to delete key: ${e.message}`, 'error', 'red');
    }
};

schema.statics.delete = async (id) => {
    try {
        const key = await Key.findById(id);

        if (key) {
            await key.delete();
        }
    } catch (e) {
        _helper.log(`Unable to delete key: ${e.message}`, 'error', 'red');
    }
};

const Key = mongoose.model('Key', schema);

module.exports = Key;