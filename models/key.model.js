const mongoose = require('mongoose');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const Schema = mongoose.Schema;
const _helper = require('../helpers/basic.helper');
const hat = require('hat');

const schema = new Schema({
    label: String,
    pass: String,
    ref: String,
    ownerId: mongoose.Types.ObjectId,
}, { timestamps: true });

schema.statics.createKey = async (label, username, ownerId) => {
    try {
        const ref = `${username}_${crypto.randomBytes(4).toString('hex')}`;

        const key = new Key({
            label,
            ref,
            ownerId,
        });

        const pass = hat();

        const k = CryptoJS.Rabbit.encrypt(pass, process.env.API_KEY_SECRET).toString();

        key['pass'] = k;

        await key.save();

        return `${ref}.${pass}`;
    } catch (e) {
        _helper.log(`Unable to create key: ${e.message}`, 'error', 'red');
    }
};

schema.statics.verify = async pass => {
    try {
        const ref = pass.split('.')[0];
        const key = await Key.findOne({ ref });

        if (!key) {
            return false;
        }

        const p1 = pass.split('.')[1];
        const p2 = CryptoJS.Rabbit.decrypt(key.pass, process.env.API_KEY_SECRET).toString(CryptoJS.enc.Utf8);

        if (p1 === p2) {
            return key._id;
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

schema.statics.rename = async (id, label) => {
    try {
        const key = await Key.findById(id);
        key.label = label;
        await key.save();
        
        return key;
    } catch (e) {
        _helper.log(`Unable to rename key: ${e.message}`, 'error', 'red');
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