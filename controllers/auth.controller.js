const mongoose = require("mongoose");

const auth = require('../services/auth.service');
const helper = require('../helpers/basic.helper');

const User = mongoose.model('User');

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await auth.login(username, password);

            res.status(200).json(user);
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(401).json({
                msg: 'invalid username or password',
                err: e
            });
        }
    },
    register: async (req, res) => {
        try {
            const { username, password, email, title } = req.body;

            await auth.register(username, password, email, title);

            res.status(200).json({
                msg: 'user created'
            });
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(401).json({
                msg: 'invalid username or password'
            });
        }
    },
    create: async (req, res) => {
        try {
            const { username, password, email, occupation, role } = req.body;

            const user = await auth.create(username, password, email, occupation, role);

            res.status(200).json(user);
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(500).json({
                msg: e.msg
            });
        }
    },
    getRole: async (req, res) => {
        try {
            const role = await auth.getRole(req.payload.id);

            res.status(200).json(role);
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(500).json({
                msg: 'error getting role'
            });
        }
    },
    delete: async (req, res) => {
        try {
            const user = await auth.deleteUser(req.payload.id);

            res.status(200).json(user);
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(500).json({
                msg: 'error deleting user'
            });
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await auth.getAll();

            res.status(200).json(users);
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(500).json({
                msg: 'error getting all users'
            });
        }
    },
    get: async (req, res) => {
        try {
            const user = await auth.get(req.params.id);

            res.status(200).json(user);
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(500).json({
                msg: 'error getting user'
            });
        }
    },
    update: async (req, res) => {
        try {
            const { username, password, email, title, role } = req.body;

            const user = await auth.update(req.params.id, username, password, email, title, role);

            res.status(200).json(user);
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(500).json({
                msg: 'error updating user'
            });
        }
    }
}